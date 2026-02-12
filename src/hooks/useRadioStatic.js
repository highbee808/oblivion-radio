import { useRef, useCallback } from "react"

export function useRadioStatic() {
  const ctxRef = useRef(null)

  const playStatic = useCallback((durationMs = 400) => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = ctxRef.current
      if (ctx.state === "suspended") ctx.resume()

      const sampleRate = ctx.sampleRate
      const length = sampleRate * (durationMs / 1000)
      const buffer = ctx.createBuffer(1, length, sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.value = 1000
      filter.Q.value = 0.5

      const gain = ctx.createGain()
      const now = ctx.currentTime
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      source.start(now)
      source.stop(now + durationMs / 1000)
    } catch {
      // Web Audio not available — fail silently
    }
  }, [])

  return { playStatic }
}
