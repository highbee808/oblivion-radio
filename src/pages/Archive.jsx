import { useState, useMemo } from "react"
import AnimatedPage from "../components/shared/AnimatedPage"
import HugeTitle from "../components/shared/HugeTitle"
import SectionLabel from "../components/shared/SectionLabel"
import PillButton from "../components/shared/PillButton"
import ArchiveCard from "../components/archive/ArchiveCard"
import { archives } from "../data/archives"
import { Grid, List } from "lucide-react"

export default function Archive() {
  const [genreFilter, setGenreFilter] = useState(null)
  const [viewMode, setViewMode] = useState("grid")

  const archiveGenres = useMemo(() => {
    return [...new Set(archives.map((a) => a.genre))]
  }, [])

  const filtered = useMemo(() => {
    if (!genreFilter) return archives
    return archives.filter((a) => a.genre === genreFilter)
  }, [genreFilter])

  return (
    <AnimatedPage className="px-6 md:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <SectionLabel className="mb-3">PAST_TRANSMISSIONS</SectionLabel>
        <HugeTitle>ARCHIVE</HugeTitle>
      </div>

      {/* Filters + View toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <PillButton
            size="sm"
            variant="outline"
            active={!genreFilter}
            onClick={() => setGenreFilter(null)}
          >
            ALL
          </PillButton>
          {archiveGenres.map((genre) => (
            <PillButton
              key={genre}
              size="sm"
              variant="outline"
              active={genreFilter === genre}
              onClick={() =>
                setGenreFilter(genreFilter === genre ? null : genre)
              }
            >
              {genre}
            </PillButton>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid" ? "text-ink" : "text-mid"
            }`}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list" ? "text-ink" : "text-mid"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Results */}
      <SectionLabel className="mb-4">
        {filtered.length} SHOW{filtered.length !== 1 ? "S" : ""}_IN_ARCHIVE
      </SectionLabel>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((show, i) => (
            <ArchiveCard key={show.id} show={show} index={i} />
          ))}
        </div>
      ) : (
        <div className="border border-ink/10 bg-paper divide-y divide-ink/5">
          {filtered.map((show, i) => (
            <div
              key={show.id}
              className="flex items-center gap-4 p-3 hover:bg-concrete/50 transition-colors"
            >
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                <img
                  src={show.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs truncate">{show.title}</div>
                <div className="font-pixel text-[11px] text-mid">
                  {show.host} — {show.station}
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-pixel text-[11px] bg-concrete px-1.5 py-0.5">
                  {show.genre}
                </span>
              </div>
              <div className="font-pixel text-[11px] text-mid flex-shrink-0">
                {show.duration}
              </div>
              <div className="font-pixel text-[11px] text-mid flex-shrink-0 hidden md:block">
                {show.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </AnimatedPage>
  )
}
