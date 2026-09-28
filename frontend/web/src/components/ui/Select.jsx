import Label from "./Label";

export default function Select({ children, className = "", label = null, value = "", onChange = () => {}, disabled = false, compact = false }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <Label>{label}</Label>}
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${compact ? "py-1.5 px-3 rounded-lg text-[13px]" : "p-3 rounded-lg text-sm"} border border-(--border) bg-(--input) text-(--text) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            >
                {children}
            </select>
        </div>
    );
}
