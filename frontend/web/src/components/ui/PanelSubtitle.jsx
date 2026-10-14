export default function PanelSubtitle({ icon = null, small = false, children, className = "" }) {
  return (
    <h2
      className={`inline-flex items-center gap-2 font-bold text-(--primary) ${small ? "text-sm" : "text-[16px]"} ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      { icon && <Icon src={icon} size={16} color="var(--primary)" /> }
      <span>{ children }</span>
    </h2>
  )
}