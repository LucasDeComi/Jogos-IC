import Game from "./CardItem"
import Icon from "./Icon"
import clock from "../../assets/icons/clock.svg"

export default function NoteItem({ gameTitle = null, gameIcon = null, gameColors, date = new Date(), therapist = null, noteText = "" }) {
  const formatter = new Intl.DateTimeFormat('pt-BR');
  const dateFormat = formatter.format(date);
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  
  return (
    <article className="flex flex-col gap-2 border-b border-(--border) px-4 py-3.25 w-full">
      <div className="flex justify-between items-center">
        {(gameTitle || gameIcon) && <Game icon={gameIcon} colors={gameColors}>{gameTitle}</Game>}
        <div className="flex items-center gap-1.5">
          <Icon src={clock} size={13} color="var(--secondary)" />
          <span className="text-xs text-(--text) font-semibold">{dateFormat} às {time}</span>
        </div>
      </div>
      <span className="text-[13px] text-(--secondary)">{noteText}</span>
      <h5 className="text-[11px] text-(--item) font-medium">{therapist}</h5>
    </article>
  )
}