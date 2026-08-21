export default function Input({ type = "text", label = null, placeholder ="" }) {
  return (
    <div className="flex flex-col items-start gap-1">
        { label && <label className="text-lg font-medium">{label}</label> }
        <input
            type={type}
            placeholder={placeholder}
            className="w-full border border-black p-2 rounded-sm"
        />
    </div>
  )
}