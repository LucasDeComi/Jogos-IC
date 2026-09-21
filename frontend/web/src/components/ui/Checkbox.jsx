import check from "../../assets/icons/check.svg";

export default function Checkbox({ label = null, checked = false, onChange = () => {}, className = "" }) {
	return (
		<label className="flex items-center gap-2 text-sm text-(--text) font-medium">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className={`h-5 w-5 appearance-none border border-(--border) rounded-xs accent-(--primary) bg-(--input) ${className}`}
				style={{
					backgroundImage: checked ? `url(${check})` : "none",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "70%",
				}}
			/>
			{label}
		</label>
	)
}