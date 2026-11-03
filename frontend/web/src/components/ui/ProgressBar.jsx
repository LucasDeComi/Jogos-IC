export default function ProgressBar({
  title,
  min = 0,
  max = 10,
  minText,
  maxText,
  value,
  progressColor,
  blockColors,
}) {
  const safeMax = Math.max(max, min || 1);
  const clampedValue = Math.min(Math.max(value, min || 0), safeMax);
  const fillPercent = ((clampedValue - (min || 0)) / (safeMax - (min || 0))) * 100 || 0;
  const remainderPercent = 100 - fillPercent;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-(--text)">{title}</h4>
        <span
          className="inline-block px-2.5 py-0.75 text-[13px] font-bold"
          style={{
            backgroundColor: blockColors.background,
            color: blockColors.text,
          }}
        >
          {`${Math.min(value, max)}/${max}`}
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-(--background)">
        <div
          className="h-full rounded-full"
          style={{
            width: `${fillPercent}%`,
            backgroundColor: progressColor,
            minWidth: fillPercent > 0 ? "10px" : "0px",
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-(--item)">{minText}</span>
        <span className="text-[10px] text-(--item)">{maxText}</span>
      </div>
    </div>
  );
}