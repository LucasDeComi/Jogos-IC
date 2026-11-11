import Panel from "./Panel";
import Icon from "./Icon";
import chatIcon from "../../assets/icons/chat.svg"
import arrow from "../../assets/icons/open.svg"

export default function ChatCard({ title = "", subtitle = "", icon = chatIcon }) {
  return (
    <Panel className="flex justify-between items-center p-3 rounded-xl cursor-pointer transition-colors duration-150 hover:bg-(--input)">
        <div className="flex items-center gap-2.5">
            {icon && <Icon src={icon} size={16} color="var(--link)" />}
            <div className="flex flex-col gap-0.75">
                <h4 className="text-[13px] text-(--text) font-semibold">{title}</h4>
                {subtitle && <span className="text-[11px] text-(--secondary)">{subtitle}</span>}
            </div>
        </div>
        <Icon src={arrow} size={14} color="var(--secondary)" />
    </Panel>
  )
}