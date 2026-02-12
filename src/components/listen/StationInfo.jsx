import { motion } from "framer-motion"
import { useRadio } from "../../context/RadioContext"
import { getStationsByGenre, getStationsByRegion } from "../../data/stations"
import SectionLabel from "../shared/SectionLabel"
import StationCard from "../shared/StationCard"

export default function StationInfo() {
  const { state } = useRadio()
  const { currentStation } = state

  if (!currentStation) return null

  const relatedStations = [
    ...getStationsByGenre(currentStation.genre),
    ...getStationsByRegion(currentStation.region),
  ]
    .filter((s, i, arr) => s.id !== currentStation.id && arr.findIndex((a) => a.id === s.id) === i)
    .slice(0, 4)

  return (
    <div>
      {/* Technical readout */}
      <SectionLabel className="mb-3">SIGNAL_DATA</SectionLabel>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
        {[
          { label: "BITRATE", value: `${currentStation.bitrate}kbps` },
          { label: "FREQUENCY", value: `${currentStation.frequency}MHz` },
          { label: "PEAK", value: "-3.2dB" },
          { label: "STEREO", value: "WIDE" },
          { label: "CODEC", value: "AAC-LC" },
          { label: "LATENCY", value: "12ms" },
        ].map((item) => (
          <div key={item.label} className="bg-paper border border-ink/10 p-3">
            <div className="font-pixel text-[11px] text-mid">{item.label}</div>
            <div className="font-mono text-sm mt-1">{item.value}</div>
          </div>
        ))}
      </div>

      {/* About */}
      <SectionLabel className="mb-3">ABOUT_STATION</SectionLabel>
      <div className="bg-paper border border-ink/10 p-4 mb-8">
        <div className="font-mono text-sm leading-relaxed text-dark-mid">
          {currentStation.description}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {currentStation.tags.map((tag) => (
            <span
              key={tag}
              className="font-pixel text-[11px] bg-concrete px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related */}
      {relatedStations.length > 0 && (
        <>
          <SectionLabel className="mb-3">RELATED_FREQUENCIES</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedStations.map((station, i) => (
              <StationCard key={station.id} station={station} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
