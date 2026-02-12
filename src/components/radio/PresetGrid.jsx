import { stations } from "../../data/stations"
import PresetCard from "../shared/PresetCard"
import SectionLabel from "../shared/SectionLabel"

export default function PresetGrid() {
  return (
    <div>
      <SectionLabel className="mb-4">FREQUENCY_PRESETS</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {stations.map((station, i) => (
          <PresetCard key={station.id} station={station} index={i} />
        ))}
      </div>
    </div>
  )
}
