import { motion } from "framer-motion"

const genreColors = {
  Electronic: "from-blue-500/20",
  Techno: "from-purple-500/20",
  "Drum & Bass": "from-orange-500/20",
  "Hip Hop": "from-red-500/20",
  Afrobeats: "from-yellow-500/20",
  "Baile Funk": "from-green-500/20",
  House: "from-cyan-500/20",
  Ambient: "from-indigo-500/20",
  Experimental: "from-pink-500/20",
  Minimal: "from-gray-500/20",
}

export default function GenreBox({ genre, stationCount, onClick, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`relative border border-ink/10 bg-gradient-to-br ${
        genreColors[genre] || "from-acid/10"
      } to-transparent p-5 hover:border-ink transition-colors`}
    >
      <div className="font-archivo-condensed text-lg">{genre}</div>
      <div className="font-pixel text-[11px] text-mid mt-1">
        {stationCount} STATION{stationCount !== 1 ? "S" : ""}
      </div>
      <div className="absolute top-3 right-3">
        <div className="w-2 h-2 bg-acid" />
      </div>
    </motion.div>
  )
}
