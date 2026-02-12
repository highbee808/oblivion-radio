export default function PixelGrid({ className = "" }) {
  return (
    <div className={`grid grid-cols-3 gap-[2px] ${className}`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-acid"
          style={{ opacity: Math.random() > 0.3 ? 1 : 0.2 }}
        />
      ))}
    </div>
  )
}
