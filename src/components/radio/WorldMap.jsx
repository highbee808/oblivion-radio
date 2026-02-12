import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { stations } from "../../data/stations"
import { useRadio } from "../../context/RadioContext"

export default function WorldMap() {
  const { state, tuneStation } = useRadio()
  const [hoveredStation, setHoveredStation] = useState(null)

  return (
    <div className="relative bg-carbon p-4 md:p-8 overflow-hidden">
      <svg
        viewBox="0 0 100 80"
        className="w-full h-auto"
        style={{ maxHeight: "500px" }}
      >
        {/* Simplified world map outline */}
        <defs>
          <pattern
            id="grid"
            width="2"
            height="2"
            patternUnits="userSpaceOnUse"
          >
            <rect width="2" height="2" fill="none" />
            <rect width="0.5" height="0.5" fill="#F50C32" opacity="0.05" />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="100" height="80" fill="url(#grid)" />

        {/* Horizontal grid lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 10}
            x2="100"
            y2={i * 10}
            stroke="#F50C32"
            strokeOpacity="0.06"
            strokeWidth="0.1"
          />
        ))}

        {/* Vertical grid lines */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 10}
            y1="0"
            x2={i * 10}
            y2="80"
            stroke="#F50C32"
            strokeOpacity="0.06"
            strokeWidth="0.1"
          />
        ))}

        {/* Simplified continental outlines */}
        {/* North America */}
        <path
          d="M10,15 L15,12 L22,12 L28,15 L30,20 L28,25 L32,28 L30,35 L25,38 L20,42 L18,38 L15,35 L12,30 L10,25 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />
        {/* South America */}
        <path
          d="M25,45 L30,43 L35,48 L36,55 L34,62 L32,68 L29,72 L26,70 L24,65 L23,58 L24,50 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />
        {/* Europe */}
        <path
          d="M45,14 L48,12 L52,13 L55,15 L56,20 L54,24 L52,26 L48,28 L45,26 L44,22 L43,18 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />
        {/* Africa */}
        <path
          d="M45,32 L50,30 L55,32 L58,38 L60,45 L58,52 L56,58 L54,64 L50,68 L46,65 L44,58 L43,50 L44,42 L43,36 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />
        {/* Asia */}
        <path
          d="M58,12 L65,10 L72,12 L78,14 L85,16 L88,22 L86,28 L82,32 L78,35 L74,38 L70,40 L66,38 L62,35 L60,30 L58,25 L56,20 L57,16 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />
        {/* Oceania */}
        <path
          d="M80,55 L88,52 L94,55 L92,60 L90,65 L86,68 L82,66 L80,62 L78,58 Z"
          fill="#F50C32"
          fillOpacity="0.08"
          stroke="#F50C32"
          strokeOpacity="0.2"
          strokeWidth="0.15"
        />

        {/* Connection lines between stations */}
        {stations.map((station, i) => {
          const nextStation = stations[(i + 1) % stations.length]
          return (
            <line
              key={`line-${station.id}`}
              x1={station.coordinates.x}
              y1={station.coordinates.y}
              x2={nextStation.coordinates.x}
              y2={nextStation.coordinates.y}
              stroke="#F50C32"
              strokeOpacity="0.04"
              strokeWidth="0.08"
              strokeDasharray="0.5,0.5"
            />
          )
        })}

        {/* Station dots */}
        {stations.map((station) => {
          const isActive = state.currentStation?.id === station.id
          const isHovered = hoveredStation?.id === station.id

          return (
            <g
              key={station.id}
              onMouseEnter={() => setHoveredStation(station)}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => tuneStation(station)}
              style={{ cursor: "crosshair" }}
            >
              {/* Pulse ring for live stations */}
              {station.isLive && (
                <circle
                  cx={station.coordinates.x}
                  cy={station.coordinates.y}
                  r="1.2"
                  fill="none"
                  stroke="#F50C32"
                  strokeWidth="0.1"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="0.8;2.5;0.8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Active ring */}
              {isActive && (
                <circle
                  cx={station.coordinates.x}
                  cy={station.coordinates.y}
                  r="2"
                  fill="none"
                  stroke="#F50C32"
                  strokeWidth="0.15"
                >
                  <animate
                    attributeName="r"
                    values="1.5;3;1.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0.2;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Main dot */}
              <circle
                cx={station.coordinates.x}
                cy={station.coordinates.y}
                r={isActive ? "0.8" : isHovered ? "0.7" : "0.5"}
                fill={isActive ? "#F50C32" : station.isLive ? "#F50C32" : "#999999"}
                className="transition-all duration-200"
              />

              {/* Hover hit area */}
              <circle
                cx={station.coordinates.x}
                cy={station.coordinates.y}
                r="2.5"
                fill="transparent"
              />
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredStation && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${hoveredStation.coordinates.x}%`,
              top: `${hoveredStation.coordinates.y - 5}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-ink border border-acid/30 px-3 py-2 shadow-lg shadow-acid/10">
              <div className="font-archivo-condensed text-xs text-paper">
                {hoveredStation.name}
              </div>
              <div className="font-pixel text-[11px] text-acid">
                {hoveredStation.frequency} MHz — {hoveredStation.city}
              </div>
              <div className="font-pixel text-[11px] text-mid mt-0.5">
                {hoveredStation.genre} • {hoveredStation.listeners.toLocaleString()} listeners
              </div>
              {hoveredStation.isLive && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 rounded-full bg-acid" />
                  <span className="font-pixel text-[11px] text-acid">LIVE</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-acid" />
          <span className="font-pixel text-[11px] text-paper/50">LIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-mid" />
          <span className="font-pixel text-[11px] text-paper/50">OFFLINE</span>
        </div>
      </div>

      {/* Coordinates display */}
      <div className="absolute top-4 right-4 font-pixel text-[11px] text-paper/30">
        {hoveredStation
          ? `LAT ${(90 - hoveredStation.coordinates.y * 1.8).toFixed(1)}° / LON ${(hoveredStation.coordinates.x * 3.6 - 180).toFixed(1)}°`
          : "HOVER_FOR_COORDINATES"}
      </div>
    </div>
  )
}
