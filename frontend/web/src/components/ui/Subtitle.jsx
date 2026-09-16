export default function Subtitle({ children, className = "" }) {
  return (
    <h2
      className={`font-bold text-lg text-[var(--primary)] ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      { children }
    </h2>
  )
}