import Select from "./Select";

export default function Filter({
    children,
    className = "",
    label = null,
    value = "",
    onChange = () => {},
    disabled = false,
    compact = false,
    icon = null,
    iconColor = "var(--link)",
}) {
    return (
        <Select
            className={`font-semibold ${className}`}
            label={label}
            labelClassName="text-[11px] !text-(--secondary)"
            value={value}
            onChange={onChange}
            disabled={disabled}
            compact={compact}
            icon={icon}
            iconColor={iconColor}
        >
            {children}
        </Select>
    );
}
