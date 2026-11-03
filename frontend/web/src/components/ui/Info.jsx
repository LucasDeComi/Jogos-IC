import Icon from "./Icon"
import info from "../../assets/icons/info.svg"

export default function Info({ icon = info, title = null, text = "" }) {
  return (
    <div className="flex gap-2.5 p-4.5 rounded-lg bg-(--transparent)">
        {icon && <Icon src={icon} color="var(--link)" size={17} />}
        <div className="flex flex-col gap-1.25">
            {title && <h5 className="text-[13px] text-(--primary) font-semibold">{title}</h5>}
            <span className="text-xs text-(--primary)">{text}</span>
        </div>
    </div>
  )
}
