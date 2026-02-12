import { motion } from "framer-motion"
import { Clock, Play } from "lucide-react"

export default function ArchiveCard({ show, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group bg-paper border border-ink/10 hover:border-ink overflow-hidden transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="scanlines-dark" />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-acid text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={20} className="ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-ink/80 px-2 py-0.5 flex items-center gap-1">
          <Clock size={8} className="text-acid" />
          <span className="font-pixel text-[11px] text-paper">
            {show.duration}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="font-mono text-xs leading-tight mb-1">{show.title}</div>
        <div className="font-pixel text-[11px] text-mid">{show.host}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-pixel text-[11px] bg-concrete px-1.5 py-0.5">
            {show.genre}
          </span>
          <span className="font-pixel text-[11px] text-mid">{show.date}</span>
        </div>
        <div className="font-pixel text-[11px] text-mid/60 mt-1">
          {show.station}
        </div>
      </div>
    </motion.div>
  )
}
