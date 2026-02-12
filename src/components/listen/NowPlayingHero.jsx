import { motion } from "framer-motion"
import { useRadio } from "../../context/RadioContext"
import SignalBar from "../shared/SignalBar"
import Waveform from "../shared/Waveform"
import EqualizerBar from "../shared/EqualizerBar"

export default function NowPlayingHero() {
  const { state } = useRadio()
  const { currentStation, isPlaying, streamStatus } = state

  if (!currentStation) {
    return (
      <div className="bg-carbon text-paper p-12 text-center">
        <div className="font-pixel text-3xl text-mid">NO_SIGNAL</div>
        <div className="font-mono text-sm text-mid/60 mt-2">
          Select a station to begin listening
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-carbon text-paper overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={currentStation.image}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/80 to-carbon/60" />
        <div className="scanlines-dark" />
      </div>

      <div className="relative z-10 p-6 md:p-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Album art */}
          <div className="relative w-full md:w-72 aspect-square flex-shrink-0 overflow-hidden">
            <img
              src={currentStation.image}
              alt={currentStation.name}
              className="w-full h-full object-cover"
            />
            <div className="scanlines-dark" />
            {isPlaying && (
              <div className="absolute bottom-3 right-3">
                <EqualizerBar size="md" />
              </div>
            )}
            {streamStatus === "playing" && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-ink/80 px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
                <span className="font-pixel text-[11px] text-acid">LIVE</span>
              </div>
            )}
          </div>

          {/* Station info */}
          <div className="flex-1">
            <div className="font-pixel text-[11px] text-acid tracking-[0.3em] mb-3">
              NOW_PLAYING
            </div>
            <div className="font-archivo-stretched text-3xl md:text-5xl leading-none">
              {currentStation.name}
            </div>
            <div className="font-mono text-sm text-paper/60 mt-3">
              {currentStation.genre}
            </div>
            <div className="font-pixel text-[11px] text-paper/30 mt-1">
              {currentStation.frequency} MHz —{" "}
              {currentStation.city}, {currentStation.country}
            </div>

            {/* Signal strength */}
            <div className="flex items-center gap-3 mt-6">
              <SignalBar strength={streamStatus === "playing" ? 5 : 3} />
              <span className="font-pixel text-[11px] text-paper/40">
                {currentStation.bitrate} kbps • {currentStation.listeners.toLocaleString()} listeners
              </span>
            </div>

            {/* Live stream indicator */}
            <div className="mt-6 h-8 flex items-center">
              {streamStatus === "playing" && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                  <span className="font-pixel text-[11px] text-acid tracking-wider">LIVE STREAM</span>
                </div>
              )}
              {streamStatus === "loading" && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-acid/40 animate-pulse" />
                  <span className="font-pixel text-[11px] text-mid">TUNING...</span>
                </div>
              )}
            </div>

            {/* Full waveform */}
            <div className="mt-4">
              <Waveform bars={60} height={40} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
