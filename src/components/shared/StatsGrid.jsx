import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

function AnimatedValue({ value, dark, format }) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)
  const frameRef = useRef(null)

  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = value

    // Extract numeric part for animation
    const prevNum = parseFloat(String(prev).replace(/[^0-9.]/g, ""))
    const nextNum = parseFloat(String(value).replace(/[^0-9.]/g, ""))

    // If both are valid numbers and they differ, animate
    if (!isNaN(prevNum) && !isNaN(nextNum) && prevNum !== nextNum) {
      const prefix = String(value).match(/^[^0-9]*/)?.[0] || ""
      const suffix = String(value).match(/[^0-9.]*$/)?.[0] || ""
      const hasCommas = format === "comma" || String(value).includes(",")
      const isDecimal = String(value).includes(".")
      const decimals = isDecimal
        ? (String(value).split(".")[1]?.replace(/[^0-9]/g, "").length || 0)
        : 0

      const duration = 600
      const start = performance.now()

      const animate = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = prevNum + (nextNum - prevNum) * eased

        let formatted
        if (decimals > 0) {
          formatted = current.toFixed(decimals)
        } else {
          formatted = Math.round(current).toString()
        }

        if (hasCommas) {
          formatted = Number(formatted).toLocaleString()
        }

        setDisplay(`${prefix}${formatted}${suffix}`)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
      }
    } else {
      setDisplay(value)
    }
  }, [value])

  return (
    <motion.div
      key={String(value)}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`font-archivo-stretched text-xl sm:text-3xl md:text-4xl leading-none tabular-nums ${
        dark ? "text-acid" : "text-ink"
      }`}
    >
      {display}
    </motion.div>
  )
}

export default function StatsGrid({ stats, dark = false }) {
  return (
    <div className="grid grid-cols-3 divide-x divide-ink/20">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="px-2 sm:px-6 py-4 text-center"
        >
          <AnimatedValue value={stat.value} dark={dark} format={stat.format} />
          <div className="font-pixel text-[11px] text-mid mt-2 tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
