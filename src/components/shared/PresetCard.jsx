import { motion } from "framer-motion"
import { useRadio } from "../../context/RadioContext"

export default function PresetCard({ station, index = 0 }) {
  const { state, tuneStation } = useRadio()
  const isActive = state.currentStation?.id === station.id

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => tuneStation(station)}
      className={`text-left p-4 border transition-all ${
        isActive
          ? "bg-acid text-ink border-acid"
          : "bg-paper border-ink/10 hover:border-ink"
      }`}
    >
      <div className="font-archivo-stretched text-2xl leading-none">
        {station.frequency}
      </div>
      <div className="font-pixel text-[11px] mt-1 opacity-60">MHz</div>
      <div className="font-mono text-xs mt-2 truncate">
        {station.name}
      </div>
      <div className="font-pixel text-[11px] mt-0.5 opacity-50">
        {station.city}
      </div>
      {station.isLive && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`w-1 h-1 rounded-full ${
              isActive ? "bg-ink" : "bg-acid"
            } animate-pulse-dot`}
          />
          <span className="font-pixel text-[11px] opacity-60">LIVE</span>
        </div>
      )}
    </motion.button>
  )
}
