export default function Button({ type, large = false, onClick, buttonType = "button", className = "", icon = null, children }) {
  return (
    <button
      type={buttonType}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border-2 text-sm font-semibold transition-colors duration-200 cursor-pointer
        ${type === "primary"
          ? "border-[var(--button)] bg-[var(--button)] text-white hover:border-[var(--hover)] hover:bg-[var(--hover)] active:border-[var(--button)] active:bg-[var(--button)]"
          : "border-[var(--border)] bg-white text-[#718096]"
        }
        ${large ? "px-6 py-3.5" : "px-5 py-3"}
        ${className}
      `}
      onClick={onClick}
    >
      {icon && (
        <span className="flex h-[1em] w-[1em] shrink-0 items-center justify-center leading-none">
          <img src={icon} alt="" className="h-full w-full object-contain" />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}