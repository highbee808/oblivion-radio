import { motion } from "framer-motion"
import { Radio, Users } from "lucide-react"
import { useRadio } from "../../context/RadioContext"
import EqualizerBar from "./EqualizerBar"

export default function StationCard({ station, index = 0 }) {
  const { state, tuneStation } = useRadio()
  const isActive = state.currentStation?.id === station.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={() => tuneStation(station)}
      className={`group relative bg-paper border overflow-hidden transition-colors ${
        isActive ? "border-acid" : "border-ink/10 hover:border-ink"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={station.image}
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="scanlines-dark" />

        {/* Live badge */}
        {station.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-ink/90 px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
            <span className="font-pixel text-[11px] text-acid">LIVE</span>
          </div>
        )}

        {/* Active indicator */}
        {isActive && state.isPlaying && (
          <div className="absolute bottom-2 right-2">
            <EqualizerBar />
          </div>
        )}

        {/* Frequency overlay */}
        <div className="absolute bottom-2 left-2 font-pixel text-[20px] text-paper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {station.frequency}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="font-archivo-condensed text-sm leading-tight mb-1">
          {station.name}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[11px] text-mid">
            {station.city}, {station.country}
          </span>
          <span className="font-pixel text-[11px] text-mid flex items-center gap-1">
            <Users size={8} />
            {station.listeners.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="font-pixel text-[11px] bg-concrete px-1.5 py-0.5">
            {station.genre}
          </span>
          <span className="font-pixel text-[11px] bg-concrete px-1.5 py-0.5">
            {station.region}
          </span>
        </div>
      </div>

      {/* Active border glow */}
      {isActive && (
        <div className="absolute inset-0 border-2 border-acid pointer-events-none" />
      )}
    </motion.div>
  )
}
