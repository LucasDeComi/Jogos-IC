export default function Subtitle({ icon = null, small = false, children, className = "" }) {
  return (
    <h2
      className={`inline-flex items-center gap-2 font-bold text-(--title) ${small ? "text-[16px]" : "text-lg"} ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      { icon && <img src={icon} className="w-4.5 h-4.5" /> }
      <span>{ children }</span>
    </h2>
  )
}