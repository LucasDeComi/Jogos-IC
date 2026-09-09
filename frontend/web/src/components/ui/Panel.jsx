export default function Panel({ children, className = "" }) {
  return (
    <div className={`w-full border-2 border-[#E9E9E9] text-lg ${className.includes("rounded") ? "" : "rounded-xl"} ${className}`}>
      {children}
    </div>
  )
}