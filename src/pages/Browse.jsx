import { useMemo } from "react"
import AnimatedPage from "../components/shared/AnimatedPage"
import HugeTitle from "../components/shared/HugeTitle"
import SectionLabel from "../components/shared/SectionLabel"
import SearchBar from "../components/browse/SearchBar"
import FilterBar from "../components/browse/FilterBar"
import StationCard from "../components/shared/StationCard"
import GenreBox from "../components/shared/GenreBox"
import { stations } from "../data/stations"
import { genres } from "../data/genres"
import { useRadio } from "../context/RadioContext"

export default function Browse() {
  const { state, dispatch } = useRadio()

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      const matchesGenre =
        !state.activeGenreFilter || s.genre === state.activeGenreFilter
      const matchesRegion =
        !state.activeRegionFilter || s.region === state.activeRegionFilter
      const matchesSearch =
        !state.searchQuery ||
        s.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        s.city.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        s.genre.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        s.tags.some((t) =>
          t.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      return matchesGenre && matchesRegion && matchesSearch
    })
  }, [state.activeGenreFilter, state.activeRegionFilter, state.searchQuery])

  const genreCounts = useMemo(() => {
    const counts = {}
    stations.forEach((s) => {
      counts[s.genre] = (counts[s.genre] || 0) + 1
    })
    return counts
  }, [])

  return (
    <AnimatedPage className="px-6 md:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <SectionLabel className="mb-3">DISCOVERY</SectionLabel>
        <HugeTitle>BROWSE</HugeTitle>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar />
      </div>

      {/* Genre Boxes (show when no filters active) */}
      {!state.activeGenreFilter && !state.activeRegionFilter && !state.searchQuery && (
        <div className="mb-10">
          <SectionLabel className="mb-4">CURATIONS</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {genres.slice(0, 8).map((genre, i) => (
              <GenreBox
                key={genre}
                genre={genre}
                stationCount={genreCounts[genre] || 0}
                index={i}
                onClick={() =>
                  dispatch({ type: "SET_GENRE_FILTER", payload: genre })
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>
          {filteredStations.length} STATION{filteredStations.length !== 1 ? "S" : ""}_FOUND
        </SectionLabel>
        {(state.activeGenreFilter || state.activeRegionFilter || state.searchQuery) && (
          <button
            onClick={() => {
              dispatch({ type: "SET_GENRE_FILTER", payload: null })
              dispatch({ type: "SET_REGION_FILTER", payload: null })
              dispatch({ type: "SET_SEARCH", payload: "" })
            }}
            className="font-pixel text-[11px] text-mid hover:text-ink transition-colors"
          >
            CLEAR_FILTERS ×
          </button>
        )}
      </div>

      {/* Station Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStations.map((station, i) => (
          <StationCard key={station.id} station={station} index={i} />
        ))}
      </div>

      {filteredStations.length === 0 && (
        <div className="text-center py-20">
          <div className="font-pixel text-2xl text-mid">NO_SIGNAL</div>
          <div className="font-mono text-xs text-mid/60 mt-2">
            No stations match your current filters
          </div>
        </div>
      )}
    </AnimatedPage>
  )
}
