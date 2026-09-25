import check from "../../assets/icons/check.svg";
import Label from "./Label";

export default function Checkbox({
  label = null,
  checked = false,
  onChange = () => {},
  className = "",
}) {
  return (
    <Label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`
			flex h-5 w-5 items-center justify-center rounded-sm border transition-colors duration-100
			${checked ? "border-(--button)" : "border-(--border)"} ${className}
		`}
        style={{
          backgroundColor: checked ? "var(--button)" : "var(--input)",
        }}
      >
        {checked && <img src={check} alt="" className="h-[70%] w-[70%]" />}
      </span>
      {label}
    </Label>
  );
}
