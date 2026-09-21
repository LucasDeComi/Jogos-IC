export default function DataRow({ title, value }) {
  return (
    <div className="flex justify-between w-full">
        <h4 className="text-[13px] text-(--secondary)">{title}</h4>
        <span className="text-[13px] text-(--text) font-semibold">{value}</span>
    </div>
  )
}