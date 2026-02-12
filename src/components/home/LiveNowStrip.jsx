import { motion } from "framer-motion"
import { getLiveStations } from "../../data/stations"
import { useRadio } from "../../context/RadioContext"
import EqualizerBar from "../shared/EqualizerBar"

export default function LiveNowStrip() {
  const liveStations = getLiveStations()
  const { state, tuneStation } = useRadio()

  return (
    <div className="border-y border-ink overflow-hidden bg-paper">
      <div className="flex animate-marquee" style={{ width: "fit-content" }}>
        {[...liveStations, ...liveStations].map((station, i) => {
          const isActive = state.currentStation?.id === station.id
          return (
            <button
              key={`${station.id}-${i}`}
              onClick={() => tuneStation(station)}
              className={`flex items-center gap-3 px-6 py-3 border-r border-ink/10 whitespace-nowrap transition-colors ${
                isActive ? "bg-acid text-ink" : "hover:bg-concrete"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
              <span className="font-archivo-condensed text-xs">
                {station.name}
              </span>
              <span className="font-pixel text-[11px] opacity-50">
                {station.frequency}
              </span>
              {isActive && state.isPlaying && <EqualizerBar size="sm" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
