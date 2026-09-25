import Label from "./Label";

export default function Select({ children, label = null, value = "", onChange = () => {}, disabled = false }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <Label>{label}</Label>}
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="p-3 border border-(--border) rounded-lg bg-(--input) text-sm text-(--text) disabled:cursor-not-allowed disabled:opacity-50"
            >
                {children}
            </select>
        </div>
    );
}
