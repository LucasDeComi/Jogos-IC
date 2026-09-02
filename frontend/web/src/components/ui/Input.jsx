export default function Input({ type = "text", label = null, placeholder ="", value = "", className = "", onChange = () => {} }) {
  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
        { label && <label className="text-lg font-medium">{label}</label> }
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border border-black p-2 rounded-sm"
        />
    </div>
  )
}