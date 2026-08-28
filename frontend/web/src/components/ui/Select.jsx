export default function Select({ children, label = null, value = "", onChange = () => {}, }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-[16px] font-semibold">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="p-2.5 border border-black rounded-md"
            >
                {children}
            </select>
        </div>
    );
}
