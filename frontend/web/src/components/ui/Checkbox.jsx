export default function Checkbox({ label = null, checked = false, onChange = () => {}, className = "" }) {
	return (
		<label className="flex items-center gap-2 text-lg font-medium">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className={`h-4 w-4 accent-black ${className}`}
			/>
			{label}
		</label>
	)
}