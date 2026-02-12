import { useClock } from "../../hooks/useClock"
import { useSystemMetrics } from "../../hooks/useSystemMetrics"
import { useRadio } from "../../context/RadioContext"

export default function StatusBar() {
  const { utc, date } = useClock()
  const metrics = useSystemMetrics()
  const { state } = useRadio()

  return (
    <div className="bg-ink text-paper px-4 py-2 flex items-center justify-between font-pixel text-xs border-t border-acid/20">
      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
          <span className="text-acid">
            {state.isPlaying ? "BROADCASTING" : "STANDBY"}
          </span>
        </div>

        <span className="text-mid">|</span>

        {/* Current station */}
        <span className="text-light-mid">
          {state.currentStation
            ? `${state.currentStation.frequency} MHz // ${state.currentStation.name}`
            : "NO_SIGNAL"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-mid">
          LISTENERS: {metrics.listeners.toLocaleString()}
        </span>
        <span className="text-mid">|</span>
        <span className="text-mid">BW: {metrics.bandwidth}</span>
        <span className="text-mid">|</span>
        <span className="text-light-mid">
          {date} {utc} UTC
        </span>
      </div>
    </div>
  )
}
