export default function Title({ children, className = "" }) {
  return (
    <h1
      className={`font-bold text-2xl ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      {children}
    </h1>
  )
}
