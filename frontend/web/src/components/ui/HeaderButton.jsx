import Icon from "./Icon";

export default function HeaderButton({
  icon = null,
  onClick = () => {},
  className = "",
  children,
  ariaLabel,
  title,
  type = "button",
}) {
  return (
    <button
        type={type}
        aria-label={ariaLabel}
        title={title}
        className={`
            ${className} inline-flex justify-center items-center gap-2 border border-(--border) rounded-[10px] p-2.25 bg-(--panel) text-[13px] text-(--primary) font-semibold
            cursor-pointer transition-colors duration-200 hover:border-(--border-hover) hover:bg-(--border)
        `}
        onClick={onClick}
    >
        {icon && <Icon src={icon} size={16} color="var(--primary)" />}
        {children !== undefined && children !== null && children !== "" && children !== false && (
            <span>{children}</span>
        )}
    </button>
  )
}