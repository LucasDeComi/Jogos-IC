import Icon from "./Icon";
import { cardColors } from "../../utils/colors";
import { formatDateTime } from "../../utils/formatDates";

export default function GameSessionCard({ colors = cardColors().green, icon = null, title, date = new Date(), patient }) {
  return (
    <div
        className="flex flex-col gap-1.75 p-3.5 rounded-lg w-full"
        style={{ backgroundColor: colors.background }}
    >
        <div className="flex items-center gap-1.75">
            { icon && <Icon src={icon} color={colors.title} size={14} /> }
            <h4
                className="text-[13px] font-bold"
                style={{ color: colors.text }}
            >
                {title}
            </h4>
        </div>
        <span className="text-[13px] text-(--text) font-semibold">{formatDateTime(date, " às ")}</span>
        <span
            className="text-xs"
            style={{ color: colors.title }}
        >
            {patient.getName()} ({patient.id})
        </span>
    </div>
  )
}