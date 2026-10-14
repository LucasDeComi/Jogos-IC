import { cardColors } from "../../utils/colors"

export default function TextCard({ title = "", text = "", colors = null }) {
  colors = cardColors()[colors];

  return (
    <div
      className="flex flex-col gap-1 rounded-lg p-3 w-full"
      style={{ backgroundColor: colors.background }}
    >
      <h5
        className="text-[11px] font-semibold"
        style={{ color: colors.title }}
      >
        {title}
      </h5>
      <span
        className="text-sm font-bold"
        style={{ color: colors.text }}
      >
        {text}
      </span>
    </div>
  )
}