export default function ChartItem({ color, children }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-3 h-0.75 rounded-xs"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-(--secondary)">{children}</span>
    </div>
  )
}
