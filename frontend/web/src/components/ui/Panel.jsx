export default function Panel({ children, className = "" }) {
  return (
    <div className={`w-full border-2 border-black rounded-md text-lg ${className}`}>
      {children}
    </div>
  )
}