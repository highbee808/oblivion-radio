export default function Heartbeat({ className = "" }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="w-2 h-2 rounded-full bg-acid animate-pulse-dot" />
      <span className="absolute w-2 h-2 rounded-full bg-acid animate-pulse-ring" />
    </span>
  )
}
