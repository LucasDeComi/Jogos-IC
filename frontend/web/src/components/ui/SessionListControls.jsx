import Icon from "./Icon";
import Select from "./Select";
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
      <Select
        aria-label="Filtrar sessões por anotação"
        compact
        containerClassName="w-fit"
        fieldClassName="!border-0 !bg-transparent"
        className={`w-fit! flex-none! px-2.5! py-1.75! text-[11px]! text-(--secondary)! bg-(--background)! ${controlClassName}`}
        value={noteFilter}
        onChange={(event) => onNoteFilterChange(event.target.value)}
      >
        <option value="all">Todas</option>
        <option value="with-note">Com anotação</option>
        <option value="without-note">Sem anotação</option>
      </Select>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 ${controlClassName}`}
        onClick={onToggleSort}
      >
        <Icon src={switchIcon} size={13} color="var(--secondary)" />
        <span>{newestFirst ? "Mais recentes" : "Mais antigas"}</span>
      </button>
    </div>
  );
}

export function SessionPageSizeSelect({ value, onChange }) {
  return (
    <Select
      aria-label="Sessões por página"
      compact
      fieldClassName="h-8 border-(--border) !bg-(--panel) hover:border-(--border-hover)"
      className="px-2 text-xs font-bold text-(--link)"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      {[5, 10, 25, 50].map((size) => (
        <option key={size} value={size}>
          {size} por página
        </option>
      ))}
    </Select>
  );
}
