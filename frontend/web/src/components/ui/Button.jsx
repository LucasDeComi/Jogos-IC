export default function Button({ type, large = false, onClick, buttonType = "button", className = "", children }) {
  return (
    <button
      type={buttonType}
      className={`font-semibold text-lg border-2 py-2 rounded-lg cursor-pointer transition-colors duration-200
        ${type === "primary"
          ? `bg-[var(--primary)] border-[var(--primary)] hover:bg-[var(--hover)] text-white
            hover:border-[var(--hover)] active:bg-[var(--primary)] active:border-[var(--primary)]`
          : "bg-white text-black border-black"
        }
        ${large ? "px-12" : "px-6"}
        ${className}
      `}
      onClick={onClick}
    >
      { children }
    </button>
  )
}