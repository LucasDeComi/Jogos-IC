import Icon from "./Icon";

export default function SessionDetails({ title, value, icon = null }) {
  return (
    <article className="flex gap-2.5">
      {icon &&
        <div className="flex justify-center items-center bg-(--transparent) rounded-lg h-full aspect-square">
          <Icon src={icon} color="var(--link)" size={15} />
        </div>
      }
      <div className="flex flex-col gap-1/2">
        <h5 className="text-[11px] text-(--item) font-semibold">{title}</h5>
        <span className="text-[13px] text-(--text) font-semibold">{value}</span>
      </div>
    </article>
  )
}