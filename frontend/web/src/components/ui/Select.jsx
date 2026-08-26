export default function Select({ children, label = null, value = "", onChange = () => {}, }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-[16px] font-semibold">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="px-2.5 py-2 border-2 border-black rounded-md"
            >
                {children}
            </select>
        </div>
    );
}
