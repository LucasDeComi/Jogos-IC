import Panel from "./Panel";
import Icon from "./Icon";

export default function GameHistoryCard({ title, icon = null, value }) {
  return (
    <Panel className="flex h-24 w-full min-w-0 flex-col gap-1.5 p-2.5 sm:gap-2.5 sm:p-4">
      <div className="flex w-full items-start justify-between gap-1">
        <h4 className="min-w-0 flex-1 text-[10px] leading-tight font-semibold text-(--secondary) sm:text-[13px]">
          {title.toUpperCase()}
        </h4>
        <Icon src={icon} color="var(--primary)" size={12} className="shrink-0" />
      </div>
      <span className="text-xl font-extrabold text-(--primary) font-[Onest] sm:text-[28px]">
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </span>
    </Panel>
  );
}
