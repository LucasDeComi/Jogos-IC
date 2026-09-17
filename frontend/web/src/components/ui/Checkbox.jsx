export default function Checkbox({ label = null, checked = false, onChange = () => {}, className = "" }) {
	return (
		<label className="flex items-center gap-2 text-sm font-medium">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className={`h-5 w-5 accent-(--primary) ${className}`}
			/>
			{label}
		</label>
	)
}