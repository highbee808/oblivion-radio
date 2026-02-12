export default function DecoSquares({ count = 3, className = "" }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-acid"
          style={{ opacity: 1 - i * 0.25 }}
        />
      ))}
    </div>
  )
}
