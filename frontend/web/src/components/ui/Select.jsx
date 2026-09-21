export default function Select({ children, label = null, value = "", onChange = () => {}, }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-(--text) font-semibold">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="p-3 border border-(--border) rounded-lg bg-(--input) text-sm text-(--text)"
            >
                {children}
            </select>
        </div>
    );
}
