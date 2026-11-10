import CardItem from "./CardItem";
import { formatDateTime } from "../../utils/formatDates";

export default function SessionItem({
  gameTitle,
  gameIcon,
  gameColors,
  noteColors,
  date,
  noteText,
  therapist,
  hasNote,
  isSelected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`flex flex-col gap-2 border-b px-4 py-3.5 w-full text-left transition-colors ${
        isSelected
          ? "border-l-4"
          : "border-l-transparent hover:bg-(--background)"
      }`}
      style={{
        backgroundColor: isSelected ? gameColors.background : "transparent",
        borderColor: isSelected ? gameColors.text : "var(--border)",
      }}
      aria-pressed={isSelected}
      onClick={onClick}
    >
      <div className="flex flex-wrap justify-between items-center gap-2 w-full">
        <CardItem compact colors={gameColors} icon={gameIcon}>
          {gameTitle}
        </CardItem>
        <span className="text-xs text-(--text) font-semibold">
          {formatDateTime(date, " às ")}
        </span>
      </div>
      <div className="flex justify-between items-center gap-3 w-full">
        <span className="text-[13px] text-(--secondary) truncate">
          {noteText}
        </span>
        <span
          className="shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: noteColors.background,
            color: noteColors.text,
          }}
        >
          {hasNote ? "Com anotação" : "Sem anotação"}
        </span>
      </div>
      {therapist && (
        <span className="text-[11px] text-(--item) font-medium">
          Registrado por {therapist}
        </span>
      )}
    </button>
  );
}
