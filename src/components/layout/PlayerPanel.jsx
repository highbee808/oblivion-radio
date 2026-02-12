import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  MessageCircle,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useRadio } from "../../context/RadioContext"
import Waveform from "../shared/Waveform"
import SignalBar from "../shared/SignalBar"
import SectionLabel from "../shared/SectionLabel"

export default function PlayerPanel() {
  const { state, dispatch, togglePlay, nextStation, prevStation } = useRadio()
  const { currentStation, isPlaying, volume, streamStatus, streamError } = state

  if (!currentStation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="font-pixel text-mid text-center">
          <div className="text-2xl mb-2">NO_SIGNAL</div>
          <div className="text-[11px]">SELECT A STATION TO BEGIN</div>
        </div>
      </div>
    )
  }

  const isFavorite = state.favoriteStations.includes(currentStation.id)

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Panel Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-paper/10">
        <SectionLabel className="text-paper/40">NOW_PLAYING</SectionLabel>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: "SET_PANEL_MODE", payload: "chat" })}
            className="font-pixel text-xs text-mid hover:text-acid flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle size={12} />
            SIGNAL_CHAT
          </button>
          <button
            onClick={() => dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: false })}
            className="xl:hidden text-mid hover:text-paper transition-colors"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Album Art */}
      <div className="relative aspect-square mx-4 mt-4 overflow-hidden">
        <img
          src={currentStation.image}
          alt={currentStation.name}
          className="w-full h-full object-cover"
        />
        <div className="scanlines-dark" />

        {/* Frequency overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="font-archivo-stretched text-4xl text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {currentStation.frequency}
          </div>
          <div className="font-pixel text-xs text-paper/70">MHz</div>
        </div>

        {/* Signal strength */}
        <div className="absolute top-4 right-4">
          <SignalBar strength={currentStation.isLive ? 4 : 2} />
        </div>

        {/* Live badge */}
        {currentStation.isLive && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-ink/80 px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
            <span className="font-pixel text-[11px] text-acid">LIVE</span>
          </div>
        )}
      </div>

      {/* Station Info */}
      <div className="px-4 mt-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-sm text-paper">{currentStation.name}</div>
            <div className="font-pixel text-xs text-mid mt-0.5">
              {currentStation.genre}
            </div>
            <div className="font-pixel text-[11px] text-paper/40 mt-0.5">
              {currentStation.city}, {currentStation.country}
            </div>
          </div>
          <button
            onClick={() =>
              dispatch({ type: "TOGGLE_FAVORITE", payload: currentStation.id })
            }
            className="p-1 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={16}
              className={isFavorite ? "fill-acid text-acid" : "text-mid"}
            />
          </button>
        </div>

        {/* Live Stream Indicator */}
        <div className="mt-4 h-8 flex items-center">
          {streamStatus === "loading" && (
            <div className="flex items-center gap-2">
              <Loader2 size={14} className="text-acid animate-spin" />
              <span className="font-pixel text-[11px] text-mid">TUNING...</span>
            </div>
          )}
          {streamStatus === "playing" && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
              <span className="font-pixel text-[11px] text-acid tracking-wider">LIVE STREAM</span>
            </div>
          )}
          {streamStatus === "error" && (
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className="text-red-400" />
              <span className="font-pixel text-[11px] text-red-400">{streamError || "STREAM ERROR"}</span>
            </div>
          )}
          {streamStatus === "idle" && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mid/40" />
              <span className="font-pixel text-[11px] text-mid">IDLE</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button onClick={prevStation} className="text-mid hover:text-paper transition-colors" aria-label="Previous station">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-acid text-ink flex items-center justify-center hover:bg-acid-dim transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button onClick={nextStation} className="text-mid hover:text-paper transition-colors" aria-label="Next station">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mt-4">
          <Volume2 size={14} className="text-mid" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) =>
              dispatch({ type: "SET_VOLUME", payload: Number(e.target.value) })
            }
            aria-label="Volume"
            className="flex-1 h-1 accent-acid bg-paper/10 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-acid"
          />
          <span className="font-pixel text-[11px] text-mid w-8 text-right">
            {volume}%
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div className="px-4 mt-4">
        <Waveform bars={40} height={32} />
      </div>

      {/* Technical Readout */}
      <div className="px-4 mt-4 pb-6">
        <SectionLabel className="text-paper/30 mb-2">SIGNAL_DATA</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "BITRATE", value: `${currentStation.bitrate} kbps` },
            { label: "FREQUENCY", value: `${currentStation.frequency} MHz` },
            { label: "PEAK", value: "-3.2 dB" },
            { label: "STEREO", value: "WIDE" },
            { label: "CODEC", value: "MP3" },
            { label: "STATUS", value: streamStatus.toUpperCase() },
          ].map((item) => (
            <div key={item.label} className="bg-paper/5 p-2">
              <div className="font-pixel text-[11px] text-mid">{item.label}</div>
              <div className="font-mono text-xs text-paper">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
