import tip from "../../assets/icons/tip.svg"

export default function Tip({ icon = {tip}, children }) {
  return (
    <span className="inline-flex gap-3 p-4 bg-[#E6F4F4] rounded-lg text-[13px] text-(--primary)">
        <img src={tip} className="w-4.5 h-4.5" />
        {children}
    </span>
  )
}