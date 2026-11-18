import Icon from "./Icon";

export default function Button({ type, size, onClick, buttonType = "button", className = "", icon = null, children, disabled = false, ariaLabel }) {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[10px] border text-[13px] font-semibold transition-colors duration-200 cursor-pointer sm:gap-2 sm:text-sm
        ${type === "primary"
          ? "border-(--button) bg-(--button) text-white hover:border-(--hover) hover:bg-(--hover) active:border-(--button) active:bg-(--button)"
          : type === "edit" ? "border-(--link) text-(--link) hover:border-(--hover)"
          : type === "transparent" ? "border-0 text-(--primary)"
          : "border-(--border) text-(--secondary) hover:border-(--border-hover)"
        }
        ${
          size === "large" ? "min-h-11 px-4 py-2.5 sm:px-6 sm:py-3" :
          size === "small" ? "min-h-9 rounded-lg px-3 py-1.5 sm:px-4 sm:py-1.5" :
          size === "extra-small" ? "min-h-8 px-2 py-1 sm:py-1.75" :
          size === "square" ? "min-h-9 min-w-9 rounded-lg p-1.5 sm:p-2" :
          "px-3 py-2 sm:px-5 sm:py-2.5"
        }
        ${size === "square" ? "aspect-square" : ""}
        disabled:cursor-not-allowed disabled:opacity-40
        ${className}
      `}
      onClick={onClick}
    >
      {icon && (
        <span className="flex h-[1em] w-[1em] shrink-0 items-center justify-center leading-none">
          <Icon src={icon} size="100%" color={type === "primary" ? "#FFF" : type === "edit" || type === "transparent" ? "var(--link)" : "var(--secondary)"} />
        </span>
      )}
      {children !== undefined && children !== null && children !== "" && children !== false && (
        <span>{children}</span>
      )}
    </button>
  );
}