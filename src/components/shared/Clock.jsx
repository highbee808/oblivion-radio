import { useClock } from "../../hooks/useClock"

export default function Clock({ className = "" }) {
  const { utc } = useClock()

  return (
    <span className={`font-pixel ${className}`}>
      {utc} <span className="text-acid">UTC</span>
    </span>
  )
}
