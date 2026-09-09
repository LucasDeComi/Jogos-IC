import { useState } from "react";
import viewIcon from "../../assets/icons/view.svg";

export default function Input({
  type = "text",
  label = null,
  placeholder = "",
  value = "",
  className = "",
  onChange = () => {},
  icon = null,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      {label && <label className="text-lg font-medium">{label}</label>}

      <div className="flex w-full items-center rounded-md border-2 border-[#E9E9E9] bg-white overflow-hidden">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white">
            <img src={icon} alt="Ícone do campo" className="h-6 w-6 object-contain" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border-0 bg-transparent p-2.5 text-base outline-none"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex h-12 w-12 shrink-0 items-center justify-center bg-white transition hover:bg-gray-50"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <img src={viewIcon} alt="Ícone de olho" className="h-6 w-6 object-contain" />
          </button>
        )}
      </div>
    </div>
  );
}