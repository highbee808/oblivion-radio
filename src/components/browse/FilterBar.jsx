import { useRadio } from "../../context/RadioContext"
import { genres, regions } from "../../data/genres"
import PillButton from "../shared/PillButton"
import SectionLabel from "../shared/SectionLabel"

export default function FilterBar() {
  const { state, dispatch } = useRadio()

  return (
    <div className="space-y-4">
      <div>
        <SectionLabel className="mb-2">GENRE</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <PillButton
              key={genre}
              size="sm"
              variant="outline"
              active={state.activeGenreFilter === genre}
              onClick={() =>
                dispatch({ type: "SET_GENRE_FILTER", payload: genre })
              }
            >
              {genre}
            </PillButton>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel className="mb-2">REGION</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <PillButton
              key={region}
              size="sm"
              variant="outline"
              active={state.activeRegionFilter === region}
              onClick={() =>
                dispatch({ type: "SET_REGION_FILTER", payload: region })
              }
            >
              {region}
            </PillButton>
          ))}
        </div>
      </div>
    </div>
  )
}
