export default function Button({ type, large = false, onClick, buttonType = "button", className = "", children }) {
  return (
    <button
      type={buttonType}
      className={`font-semibold text-lg py-2 border-2 border-black rounded-sm cursor-pointer
        ${type === "primary" ? "bg-black text-white" : "bg-white text-black"}
        ${large ? "px-12" : "px-6"}
        ${className}
      `}
      onClick={onClick}
    >
      { children }
    </button>
  )
}