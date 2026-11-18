import Icon from "./Icon";

export default function Subtitle({ icon = null, small = false, children, className = "" }) {
  return (
    <h2
      className={`inline-flex items-center gap-2 font-bold text-(--title) ${small ? "text-sm sm:text-[16px]" : "text-base sm:text-lg"} ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      { icon && <Icon src={icon} size={small ? 16 : 18} color="var(--title)" /> }
      <span>{ children }</span>
    </h2>
  )
}