export default function Title({ children, className = "" }) {
  return (
    <h1
      className={`text-xl font-bold leading-tight text-(--title) sm:text-2xl ${className}`}
      style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
    >
      {children}
    </h1>
  )
}
