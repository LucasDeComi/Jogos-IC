export default function PatientCardItem({ icon = null, title, value }) {
  return (
    <div className="flex flex-col justify-center items-start">
        <div className="flex items-center gap-1">
            <img src={icon} className="w-3 h-3" />
            <h5 className="text-[11px] text-[#A0AEC0] font-semibold">{title.toUpperCase()}</h5>
        </div>
        <span className="text-[13px] font-semibold">{value}</span>
    </div>
  )
}