import { useRadio } from "../../context/RadioContext"

export default function Waveform({ bars = 60, height = 48, className = "" }) {
  const { state } = useRadio()

  return (
    <div
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-acid origin-bottom"
          style={{
            animation: state.isPlaying
              ? `wave ${0.8 + Math.random() * 0.8}s ease-in-out ${
                  Math.random() * 0.5
                }s infinite`
              : `wave-idle ${2 + Math.random()}s ease-in-out ${
                  Math.random() * 0.5
                }s infinite`,
            height: "100%",
          }}
        />
      ))}
    </div>
  )
}
