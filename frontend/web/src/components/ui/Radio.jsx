export default function Radio({ checked = false, onChange = () => {}, name = "radio-group" }) {
  return (
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 accent-black cursor-pointer"
    />
  );
}
