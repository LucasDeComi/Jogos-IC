export default function Panel({ children, className = "" }) {
  return (
    <div className={`w-full border border-[var(--border)] bg-white text-lg ${className.includes("rounded") ? "" : "rounded-2xl"} ${className}`}>
      {children}
    </div>
  )
}