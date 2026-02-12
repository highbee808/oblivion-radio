export default function SignalBar({ strength = 4, max = 5 }) {
  return (
    <div className="flex items-end gap-[2px]">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-[3px] transition-colors ${
            i < strength ? "bg-acid" : "bg-ink/20"
          }`}
          style={{ height: 4 + i * 3 }}
        />
      ))}
    </div>
  )
}
