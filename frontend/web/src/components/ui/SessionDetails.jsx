import Icon from "./Icon";

export default function SessionDetails({ title, value, icon = null }) {
  return (
    <article className="flex min-w-0 gap-2">
      {icon &&
        <div className="flex justify-center items-center bg-(--transparent) rounded-lg h-full aspect-square">
          <Icon src={icon} color="var(--link)" size={15} />
        </div>
      }
      <div className="flex min-w-0 flex-col gap-1/2">
        <h5 className="text-[11px] text-(--item) font-semibold">{title}</h5>
        <span className="wrap-break-word text-xs font-semibold text-(--text) sm:text-[13px]">{value}</span>
      </div>
    </article>
  )
}