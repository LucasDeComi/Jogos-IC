import { useState } from "react";
import viewIcon from "../../assets/icons/viewPassword.svg";

export default function Input({
  type = "text",
  label = null,
  placeholder = "",
  value = "",
  className = "",
  onChange = () => {},
  icon = null,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-(--text-black)">
          {label}
        </label>
      )}

      <div className="flex w-full items-center overflow-hidden rounded-lg border border-(--border) bg-white">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white">
            <img src={icon} className="h-4 w-4 object-contain" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="w-full border-0 bg-transparent p-2.5 text-sm text-(--text-black) outline-none placeholder-[#A0AEC0]"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-white transition hover:bg-gray-50"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <img src={viewIcon} className="h-4 w-4 object-contain" />
          </button>
        )}
      </div>
    </div>
  );
}
