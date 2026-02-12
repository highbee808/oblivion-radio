export default function EqualizerBar({ size = "sm" }) {
  const barCount = size === "sm" ? 4 : 6
  const h = size === "sm" ? 14 : 24

  return (
    <div className="flex items-end gap-[2px]" style={{ height: h }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] bg-acid"
          style={{
            animation: `equalizer ${0.5 + Math.random() * 0.5}s ease-in-out ${
              i * 0.1
            }s infinite`,
            height: "100%",
          }}
        />
      ))}
    </div>
  )
}
