import Checkbox from "./Checkbox"

export default function SoundSetting({ title, description, label, checked = false, onChange = () => {} }) {
  return (
    <div className="flex flex-col gap-2.5">
        <h5 className="text-[13px] text-(--text) font-semibold">{title}</h5>
        <span className="text-[13px] text-(--secondary)">{description}</span>
        <Checkbox
            label={label}
            checked={checked}
            onChange={onChange}
        />
    </div>
  )
}
