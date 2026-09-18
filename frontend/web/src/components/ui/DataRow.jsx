export default function DataRow({ title, value }) {
  return (
    <div className="flex justify-between w-full">
        <h4 className="text-[13px] text-[#718096]">{title}</h4>
        <span className="text-[13px] text-(--text-black) font-semibold">{value}</span>
    </div>
  )
}