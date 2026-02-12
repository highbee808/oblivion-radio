import { useState, useEffect } from "react"

export function useSystemMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 23,
    latency: 12,
    listeners: 142587,
    uptime: "99.97%",
    bandwidth: "2.4 TB",
    activeStations: 14,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(5, Math.min(45, prev.cpu + (Math.random() * 6 - 3))),
        latency: Math.max(4, Math.min(35, prev.latency + (Math.random() * 8 - 4))),
        listeners: Math.max(
          100000,
          Math.min(200000, prev.listeners + Math.floor(Math.random() * 2000 - 1000))
        ),
        uptime: "99.97%",
        bandwidth: `${(2.3 + Math.random() * 0.4).toFixed(1)} TB`,
        activeStations: Math.random() > 0.9 ? (prev.activeStations === 14 ? 13 : 14) : prev.activeStations,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return metrics
}
