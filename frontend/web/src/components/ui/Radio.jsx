import Icon from "./Icon";

export default function Radio({ checked = false, onClick = () => {}, label = null, icon = null, iconColor = "var(--primary)", title, indicatorPosition = "right" }) {
  const indicator = (
    <span
      aria-hidden="true"
      className={`h-full aspect-square rounded-full bg-(--panel) ${
        checked
          ? "border-4 border-(--primary)"
          : "border border-(--secondary)"
      }`}
    />
  );

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={`inline-flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-3 text-[13px] font-semibold transition-colors duration-200 cursor-pointer
        ${
          checked
            ? "border-(--primary) bg-(--transparent) text-(--primary)"
            : "border-(--border) text-(--text) hover:border-(--border-hover)"
        }`}
    >
        {indicatorPosition === "left" && indicator}
      <span className="inline-flex min-w-0 flex-1 items-center gap-2 text-left">
        {icon && (
          <Icon
            src={icon}
            size="1em"
            color={iconColor}
            className="shrink-0"
          />
        )}
        <span>{title ?? label}</span>
      </span>
      {indicatorPosition !== "left" && indicator}
    </button>
  );
}