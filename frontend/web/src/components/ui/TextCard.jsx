import { cardColors } from "../../utils/colors"

export default function TextCard({ title = "", text = "", colors = null }) {
  colors = cardColors()[colors];

  return (
    <div
      className="flex min-w-0 w-full flex-col gap-1 rounded-lg p-3"
      style={{ backgroundColor: colors.background }}
    >
      <h5
        className="text-[11px] font-semibold"
        style={{ color: colors.title }}
      >
        {title}
      </h5>
      <span
        className="wrap-break-word text-sm font-bold"
        style={{ color: colors.text }}
      >
        {text}
      </span>
    </div>
  )
}