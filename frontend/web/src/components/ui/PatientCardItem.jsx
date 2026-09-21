import Icon from "./Icon"

export default function PatientCardItem({ icon = null, title, value }) {
  return (
    <div className="flex flex-col justify-center items-start">
        <div className="flex items-center gap-1">
            <Icon src={icon} size={12} color="var(--secondary)" />
            <h5 className="text-[11px] text-(--secondary) font-semibold">{title.toUpperCase()}</h5>
        </div>
        <span className="text-[13px] text-(--text) font-semibold">{value}</span>
    </div>
  )
}