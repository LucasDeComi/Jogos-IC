import Icon from "./Icon"

export default function PatientCardItem({ icon = null, title, value }) {
  return (
    <div className="flex min-w-0 flex-col items-start justify-center">
        <div className="flex min-w-0 items-center gap-1">
            <Icon src={icon} size={12} color="var(--secondary)" />
            <h5 className="truncate text-[10px] font-semibold text-(--secondary) sm:text-[11px]">{title.toUpperCase()}</h5>
        </div>
        <span className="wrap-break-word text-xs font-semibold text-(--text) sm:text-[13px]">{value}</span>
    </div>
  )
}