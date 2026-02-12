import { motion } from "framer-motion"
import { stations } from "../../data/stations"
import { useRadio } from "../../context/RadioContext"
import SectionLabel from "../shared/SectionLabel"

const featured = [
  stations.find((s) => s.city === "Tokyo"),
  stations.find((s) => s.city === "Berlin"),
  stations.find((s) => s.city === "Lagos"),
]

export default function RegionHighlights() {
  const { tuneStation } = useRadio()

  return (
    <div className="px-6 md:px-12 py-12">
      <SectionLabel className="mb-6">FEATURED_REGIONS</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map((station, i) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            whileHover={{ y: -4 }}
            onClick={() => tuneStation(station)}
            className="relative group overflow-hidden bg-ink"
          >
            <img
              src={station.image}
              alt={station.name}
              className="w-full aspect-[4/3] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
            />
            <div className="scanlines-dark" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="font-pixel text-[11px] text-acid mb-1">
                {station.region}
              </div>
              <div className="font-archivo-stretched text-xl text-paper leading-tight">
                {station.name}
              </div>
              <div className="font-mono text-xs text-paper/50 mt-1">
                {station.city}, {station.country} — {station.frequency} MHz
              </div>
              {station.isLive && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1 h-1 rounded-full bg-acid animate-pulse-dot" />
                  <span className="font-pixel text-[11px] text-acid">
                    LIVE — {station.listeners.toLocaleString()} LISTENERS
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
