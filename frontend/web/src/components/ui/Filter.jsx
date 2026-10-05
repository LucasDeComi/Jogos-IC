import Icon from "./Icon";

export default function Filter({ children, className = "", label = null, value = "", onChange = () => {}, disabled = false, compact = false, icon = null, iconColor = "var(--button)" }) {
    return (
        <div className="flex flex-col gap-1">
            { label && <label className="text-sm font-semibold text-(--secondary)">{children}</label> }
            <div className="flex items-center gap-2">
                {icon && (
                    <span className="flex h-[1em] w-[1em] shrink-0 items-center justify-center leading-none">
                        <Icon src={icon} size="100%" color={iconColor} />
                    </span>
                )}
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        ${compact
                            ? "py-1.5 px-3 rounded-lg text-[13px]"
                            : "p-3 rounded-lg text-sm"
                        }
                        flex-1 border border-(--border) bg-(--input) text-(--text) font-semibold
                        disabled:cursor-not-allowed disabled:opacity-50 ${className}
                    `}
                >
                    {children}
                </select>
            </div>
        </div>
    );
}