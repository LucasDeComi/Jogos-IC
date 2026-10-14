import Game from "./CardItem"
import Icon from "./Icon"
import { formatDateTime } from "../../utils/formatDates";
import clock from "../../assets/icons/clock.svg"

export default function NoteItem({
  gameTitle = null,
  gameIcon = null,
  gameColors,
  date = new Date(),
  therapist = null,
  noteText = "",
  isSelected = false,
  onClick = () => {}
}) {
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }
  
  return (
    <article
      className={`flex flex-col gap-2 border-b px-4 py-3.25 w-full cursor-pointer transition-colors ${isSelected ? "border-l" : "hover:bg-(--background)"}`}
      style={{
        backgroundColor: isSelected ? gameColors.background : "transparent",
        borderColor: isSelected ? gameColors.text : "var(--border)"
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center">
        {(gameTitle || gameIcon) && <Game icon={gameIcon} colors={gameColors}>{gameTitle}</Game>}
        <div className="flex items-center gap-1.5">
          <Icon src={clock} size={13} color="var(--secondary)" />
          <span className="text-xs text-(--text) font-semibold">{formatDateTime(date, " às ")}</span>
        </div>
      </div>
      <span className="text-[13px] text-(--secondary)">{noteText}</span>
      <h5 className="text-[11px] text-(--item) font-medium">{therapist}</h5>
    </article>
  )
}