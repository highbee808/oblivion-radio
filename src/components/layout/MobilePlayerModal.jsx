import { useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Heart,
  Volume2,
  MessageCircle,
  Headphones,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useRadio } from "../../context/RadioContext"
import SignalBar from "../shared/SignalBar"
import MobileChatView from "./MobileChatView"

export default function MobilePlayerModal() {
  const { state, dispatch, togglePlay, nextStation, prevStation } = useRadio()
  const { currentStation, isPlaying, volume, streamStatus, streamError } = state
  const [tab, setTab] = useState("player") // "player" | "chat"

  if (!currentStation) return null

  const isFavorite = state.favoriteStations.includes(currentStation.id)

  return (
    <div className="fixed inset-0 z-[60] bg-carbon text-paper flex flex-col">
      {/* Drag handle + close */}
      <div className="flex flex-col items-center pt-3 px-5 flex-shrink-0">
        <div className="w-10 h-1 rounded-full bg-paper/20 mb-3" />
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() =>
              dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: false })
            }
            className="p-1 -ml-1 text-mid hover:text-paper transition-colors"
          >
            <ChevronDown size={28} />
          </button>
          <div className="text-center flex-1">
            <div className="font-pixel text-[11px] text-mid/60 tracking-[0.3em]">
              PLAYING FROM
            </div>
            <div className="font-mono text-xs text-paper/50 mt-0.5 truncate px-4">
              {currentStation.name}
            </div>
          </div>
          <button
            onClick={() =>
              dispatch({ type: "TOGGLE_FAVORITE", payload: currentStation.id })
            }
            className="p-1 -mr-1 transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-acid text-acid" : "text-mid/60"}
            />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 mt-3 w-full bg-paper/5 p-1 rounded-sm">
          <button
            onClick={() => setTab("player")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 font-pixel text-[11px] tracking-wider transition-colors ${
              tab === "player"
                ? "bg-paper/10 text-paper"
                : "text-mid hover:text-paper"
            }`}
          >
            <Headphones size={14} />
            NOW PLAYING
          </button>
          <button
            onClick={() => setTab("chat")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 font-pixel text-[11px] tracking-wider transition-colors ${
              tab === "chat"
                ? "bg-paper/10 text-paper"
                : "text-mid hover:text-paper"
            }`}
          >
            <MessageCircle size={14} />
            SIGNAL CHAT
          </button>
        </div>
      </div>

      {/* Tab content */}
      {tab === "chat" ? (
        <MobileChatView />
      ) : (
        <>
          {/* Player content — scrollable area */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 min-h-0 overflow-y-auto">
            {/* Album Art */}
            <div className="relative w-full max-w-[320px] aspect-square overflow-hidden rounded-sm shadow-2xl shadow-black/50 flex-shrink-0">
              <img
                src={currentStation.image}
                alt={currentStation.name}
                className="w-full h-full object-cover"
              />
              <div className="scanlines-dark" />

              {/* Frequency overlay */}
              <div className="absolute bottom-4 left-4">
                <div className="font-archivo-stretched text-4xl text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {currentStation.frequency}
                </div>
                <div className="font-pixel text-xs text-paper/60">MHz</div>
              </div>

              {/* Signal strength */}
              <div className="absolute top-4 right-4">
                <SignalBar strength={currentStation.isLive ? 4 : 2} />
              </div>

              {/* Live badge */}
              {currentStation.isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-ink/80 backdrop-blur-sm px-2 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
                  <span className="font-pixel text-[11px] text-acid">LIVE</span>
                </div>
              )}
            </div>

            {/* Station Info */}
            <div className="w-full max-w-[320px] mt-8">
              <div className="font-mono text-lg text-paper leading-tight truncate">
                {currentStation.name}
              </div>
              <div className="font-pixel text-sm text-mid mt-1 truncate">
                {currentStation.genre} — {currentStation.city}
              </div>
            </div>

            {/* Live Stream Indicator */}
            <div className="w-full max-w-[320px] mt-6 h-8 flex items-center">
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

            {/* Transport Controls */}
            <div className="flex items-center justify-between w-full max-w-[280px] mt-4">
              <div className="w-[18px]" />
              <button
                onClick={prevStation}
                className="text-paper/80 hover:text-paper transition-colors"
              >
                <SkipBack size={28} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-paper text-ink flex items-center justify-center rounded-full hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" className="ml-1" />
                )}
              </button>
              <button
                onClick={nextStation}
                className="text-paper/80 hover:text-paper transition-colors"
              >
                <SkipForward size={28} fill="currentColor" />
              </button>
              <div className="w-[18px]" />
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 mt-8 w-full max-w-[320px]">
              <Volume2 size={16} className="text-mid/60 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) =>
                  dispatch({ type: "SET_VOLUME", payload: Number(e.target.value) })
                }
                className="flex-1 h-1 accent-acid bg-paper/10 appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-paper [&::-webkit-slider-thumb]:rounded-full"
              />
              <span className="font-pixel text-[11px] text-mid/60 w-8 text-right">
                {volume}%
              </span>
            </div>
          </div>

          {/* Bottom safe area */}
          <div className="flex-shrink-0 pb-8 pt-4 px-8 flex items-center justify-center gap-4">
            <div className="font-pixel text-[11px] text-mid/40 tracking-widest">
              {currentStation.city} — {currentStation.bitrate}kbps
            </div>
          </div>
        </>
      )}
    </div>
  )
}
