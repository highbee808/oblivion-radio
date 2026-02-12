export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`font-pixel text-xs tracking-[0.3em] text-mid ${className}`}>
      [ {children} ]
    </div>
  )
}
