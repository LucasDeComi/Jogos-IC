import Icon from "./Icon";

export default function Subtitle({ icon = null, small = false, children, className = "" }) {
  return (
    <h2
      className={`inline-flex items-center gap-2 font-bold text-(--primary) ${small ? "text-[16px]" : "text-lg"} ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      { icon && <Icon src={icon} size={18} color="var(--primary)" /> }
      <span>{ children }</span>
    </h2>
  )
}