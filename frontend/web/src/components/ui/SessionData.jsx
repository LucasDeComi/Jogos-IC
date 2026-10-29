import Icon from "./Icon"

export default function SessionData({ title, text, icon = null, textColor = "var(--text)", iconColor = "var(--secondary)" }) {
  return (
    <div className="flex flex-col gap-1.75">
        <h4 className="text-[11px] text-(--secondary) font-semibold">{title}</h4>
        <div className="flex items-center gap-1.75">
            {icon && <Icon src={icon} size={14} color={iconColor} />}
            <span
                className="text-sm font-semibold"
                style={{ color: textColor }}
            >
                {text}
            </span>
        </div>
    </div>
  )
}