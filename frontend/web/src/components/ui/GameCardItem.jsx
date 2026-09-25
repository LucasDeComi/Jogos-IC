export default function GameCardItem({ colors, children }) {
  return (
    <div
      className={`px-2.5 py-1 text-[11px] font-semibold rounded-sm ${children ? "" : "hidden"}`}
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <span>{children}</span>
    </div>
  )
}