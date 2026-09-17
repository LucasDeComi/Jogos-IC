export default function Button({ type, large = false, onClick, buttonType = "button", className = "", icon = null, children }) {
  return (
    <button
      type={buttonType}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border-2 text-sm font-semibold transition-colors duration-200 cursor-pointer
        ${type === "primary"
          ? "border-(--button) bg-(--button) text-white hover:border-(--hover) hover:bg-(--hover) active:border-(--button) active:bg-(--button)"
          : "border-(--border) bg-white text-[#718096] hover:border-[#CBD5E0]"
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