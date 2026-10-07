import Icon from "./Icon";

export default function Filter({ children, className = "", label = null, value = "", onChange = () => {}, disabled = false, compact = false, icon = null, iconColor = "var(--button)" }) {
    return (
        <div className="flex flex-col gap-1">
            { label && <label className="text-sm font-semibold text-(--secondary) text-[11px]">{label}</label> }
            <div className="flex items-center rounded-lg border border-(--border) px-3 bg-(--input)">
                {icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                        <Icon src={icon} size="100%" color={iconColor} />
                    </span>
                )}
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        ${compact
                            ? `py-1.5 ${icon ? "pl-2 pr-3" : "px-3"} rounded-lg text-[13px]`
                            : `${icon ? "py-3 pl-2 pr-3" : "p-3"} rounded-lg text-sm`
                        }
                        min-w-0 flex-1 border-0 bg-transparent text-(--text) font-semibold outline-0
                        disabled:cursor-not-allowed disabled:opacity-50 ${className}
                    `}
                >
                    {children}
                </select>
            </div>
        </div>
    );
}