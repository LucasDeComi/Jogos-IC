import Icon from "./Icon";
import switchIcon from "../../assets/icons/switch.svg";

const controlClassName =
  "rounded-lg px-2.5 py-1.75 bg-(--background) text-[11px] text-(--secondary) font-semibold outline-0 transition-colors duration-150 hover:bg-(--border) active:bg-(--background)";

export default function SessionListControls({
  newestFirst,
  onToggleSort,
  noteFilter,
  onNoteFilterChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 ${controlClassName}`}
        onClick={onToggleSort}
      >
        <Icon src={switchIcon} size={13} color="var(--secondary)" />
        <span>{newestFirst ? "Mais recentes" : "Mais antigas"}</span>
      </button>
      <select
        aria-label="Filtrar sessões por anotação"
        className={controlClassName}
        value={noteFilter}
        onChange={(event) => onNoteFilterChange(event.target.value)}
      >
        <option value="all">Todas</option>
        <option value="with-note">Com anotação</option>
        <option value="without-note">Sem anotação</option>
      </select>
    </div>
  );
}

export function SessionPageSizeSelect({ value, onChange }) {
  return (
    <select
      aria-label="Sessões por página"
      className="h-8 rounded-lg border border-(--border) bg-(--panel) px-2 text-xs font-bold text-(--link) outline-0 transition-colors hover:border-(--border-hover)"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      {[5, 10, 25, 50].map((size) => (
        <option key={size} value={size}>
          {size} por página
        </option>
      ))}
    </select>
  );
}
