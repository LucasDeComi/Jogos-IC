import Panel from "./Panel";
import Icon from "./Icon";

export default function GameHistoryCard({ title, icon = null, value }) {
  return (
    <Panel className="flex flex-col gap-2.5 p-5 w-full">
      <div className="flex justify-between w-full">
        <h4 className="text-[13px] text-(--secondary) font-semibold">
          {title.toUpperCase()}
        </h4>
        <Icon src={icon} color="var(--primary)" size={16} />
      </div>
      <span className="text-[28px] text-(--primary) font-extrabold font-[Onest]">
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </span>
    </Panel>
  );
}
