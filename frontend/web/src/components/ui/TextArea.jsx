import Label from "./Label"

export default function TextArea({
  label = null,
  placeholder,
  onChange = () => {},
  value,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.75 w-full">
      {label &&
        <Label>{label}</Label>
      }
      <textarea
        className="border border-(--border) outline-none focus:border-2 focus:border-(--border-hover) rounded-lg p-3 w-full h-30 resize-none text-sm text-(--text) placeholder-(--secondary)"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      >
        {children}
      </textarea>
    </div>
  )
}