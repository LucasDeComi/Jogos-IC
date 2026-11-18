import { useState } from "react";
import Icon from "./Icon";
import Label from "./Label";
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
        <Label>{label}</Label>
      )}

      <div className="flex w-full items-center overflow-hidden rounded-lg bg-(--input) border border-(--border)">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
            <Icon src={icon} size={15} color="var(--secondary)" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="w-full border-0 bg-transparent p-2 text-[13px] text-(--text) outline-none placeholder-[#A0AEC0] sm:p-2.5 sm:text-sm"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-(--input) transition-colors hover:bg-(--input-hover) sm:h-11 sm:w-11"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <Icon src={viewIcon} size={16} color="var(--secondary)" />
          </button>
        )}
      </div>
    </div>
  );
}
