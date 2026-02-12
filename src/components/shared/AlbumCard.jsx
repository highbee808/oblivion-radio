import { motion } from "framer-motion"
import EqualizerBar from "./EqualizerBar"

export default function AlbumCard({ track, station, isPlaying, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-2 hover:bg-ink/5 transition-colors"
    >
      <div className="w-10 h-10 bg-carbon flex-shrink-0 overflow-hidden relative">
        {station?.image && (
          <img
            src={station.image}
            alt={station?.name || ""}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
            <EqualizerBar size="sm" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-xs truncate">{track.title}</div>
        <div className="font-pixel text-[11px] text-mid">{track.artist}</div>
      </div>
      <div className="font-pixel text-[11px] text-mid flex-shrink-0">
        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
      </div>
    </motion.div>
  )
}
