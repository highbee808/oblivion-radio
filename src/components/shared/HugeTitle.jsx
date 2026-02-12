import { motion } from "framer-motion"

export default function HugeTitle({ children, className = "", dark = false }) {
  return (
    <motion.h1
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className={`font-archivo-stretched leading-[0.85] ${
        dark ? "text-paper" : "text-ink"
      } ${className}`}
      style={{ fontSize: "clamp(48px, min(8vw, 12vh), 120px)" }}
    >
      {children}
    </motion.h1>
  )
}
