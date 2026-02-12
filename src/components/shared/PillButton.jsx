import { motion } from "framer-motion"

export default function PillButton({
  children,
  onClick,
  variant = "acid",
  size = "md",
  active = false,
  className = "",
}) {
  const variants = {
    acid: "bg-acid text-ink hover:bg-acid-dim",
    dark: "bg-ink text-paper hover:bg-dark-mid",
    outline: `border border-ink text-ink hover:bg-ink hover:text-paper ${
      active ? "bg-ink text-paper" : ""
    }`,
    ghost: `text-mid hover:text-ink ${active ? "text-ink font-bold" : ""}`,
  }

  const sizes = {
    sm: "px-3 py-1 text-[11px]",
    md: "px-5 py-2 text-xs",
    lg: "px-6 py-2.5 text-xs",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`font-mono tracking-wider uppercase transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
