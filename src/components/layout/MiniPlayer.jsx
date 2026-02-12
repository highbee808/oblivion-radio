import { Play, Pause, SkipForward, ChevronUp, Loader2 } from "lucide-react"
import { useRadio } from "../../context/RadioContext"

export default function MiniPlayer() {
  const { state, dispatch, togglePlay, nextStation } = useRadio()
  const { currentStation, isPlaying, streamStatus } = state

  if (!currentStation) return null

  return (
    <div
      className="bg-carbon border-t border-acid/20 px-4 py-2 flex items-center gap-3"
      onClick={() => dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: true })}
    >
      {/* Mini album art */}
      <div className="w-10 h-10 bg-ink flex-shrink-0 overflow-hidden rounded-sm relative">
        <img
          src={currentStation.image}
          alt={currentStation.name}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-xs text-paper truncate">
          {currentStation.name}
        </div>
        <div className="font-pixel text-[11px] text-mid truncate">
          {currentStation.frequency} MHz — {currentStation.genre}
        </div>
        {/* Live indicator bar */}
        <div className="h-0.5 mt-1 rounded-full overflow-hidden">
          {streamStatus === "loading" ? (
            <div className="h-full bg-acid/40 animate-pulse w-full" />
          ) : streamStatus === "playing" ? (
            <div className="h-full bg-acid w-full" />
          ) : (
            <div className="h-full bg-ink/50 w-full" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {streamStatus === "loading" ? (
          <Loader2 size={20} className="text-acid animate-spin" />
        ) : (
          <button onClick={togglePlay} className="text-paper hover:text-acid transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        )}
        <button onClick={nextStation} className="text-mid hover:text-paper transition-colors" aria-label="Next station">
          <SkipForward size={18} />
        </button>
      </div>

      {/* Expand hint */}
      <ChevronUp size={14} className="text-mid/40 flex-shrink-0" />
    </div>
  )
}
