import { useState, useEffect } from "react"

const BOOT_LINES = [
  { ms: 0,    text: "OBLIVION_RADIO KERNEL v2.1.0",         cls: "text-acid font-bold" },
  { ms: 100,  text: "========================================", cls: "text-dark-mid" },
  { ms: 300,  text: "> INITIALIZING CORE SYSTEMS...",        cls: "text-paper" },
  { ms: 600,  text: "[OK] Audio decoder loaded",             cls: "ok" },
  { ms: 800,  text: "[OK] Frequency scanner online",         cls: "ok" },
  { ms: 1000, text: "progress",                              cls: "progress" },
  { ms: 1900, text: "> DECRYPTING SIGNAL MESH...",           cls: "text-paper" },
  { ms: 2300, text: "> CONNECTING TO UNDERGROUND NETWORK...", cls: "text-paper" },
  { ms: 2600, text: "  ROUTE: [TOKYO > BERLIN > LAGOS > BOGOTA]", cls: "text-mid" },
  { ms: 2900, text: "> 20 STATIONS FOUND",                  cls: "text-acid" },
  { ms: 3200, text: "signal-locked",                         cls: "text-acid" },
]

export default function BootScreen({ onComplete }) {
  const [visible, setVisible] = useState([])
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    // Skip animation if already booted this session
    if (sessionStorage.getItem("oblivion-booted")) {
      onComplete?.()
      return
    }

    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisible(prev => [...prev, i]), line.ms)
    )

    // Progress bar starts filling at 1000ms
    const barTimer = setTimeout(() => setBarWidth(100), 1050)

    // Fire onComplete at 3600ms
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem("oblivion-booted", "true")
      onComplete?.()
    }, 3600)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(barTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-carbon z-[9999] flex items-center justify-center scanlines-dark noise-overlay">
      <div className="max-w-xl w-full px-6 font-pixel text-sm leading-relaxed">
        {BOOT_LINES.map((line, i) => {
          if (!visible.includes(i)) return null

          // Progress bar line
          if (line.cls === "progress") {
            return (
              <div key={i} className="text-paper">
                {">"} SCANNING FREQUENCIES...{" "}
                <span className="inline-flex items-center gap-1">
                  [
                  <span className="inline-block h-3 relative" style={{ width: "80px" }}>
                    <span
                      className="absolute inset-y-0 left-0 bg-acid"
                      style={{
                        width: `${barWidth}%`,
                        transition: "width 800ms linear",
                      }}
                    />
                    <span className="absolute inset-y-0 left-0 w-full bg-dark-mid opacity-30" />
                  </span>
                  ] 78%
                </span>
              </div>
            )
          }

          // Signal locked line with terminal cursor
          if (line.text === "signal-locked") {
            return (
              <div key={i} className="text-acid font-bold terminal-cursor">
                {">"} SIGNAL LOCKED{" "}
              </div>
            )
          }

          // [OK] lines — highlight the [OK] in acid
          if (line.cls === "ok") {
            return (
              <div key={i} className="text-paper">
                {"  "}<span className="text-acid">[OK]</span>{line.text.replace("[OK]", "")}
              </div>
            )
          }

          // Default lines
          return (
            <div key={i} className={line.cls}>
              {line.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}
