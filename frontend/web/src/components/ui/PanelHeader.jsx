import Icon from "./Icon"
import PanelTitle from "./PanelTitle";

export default function PanelHeader({ title, subtitle, icon = null }) {
  return (
    <section className="flex items-center gap-3 w-full">
        {icon &&
            <div className="flex justify-center items-center h-[85%] bg-(--transparent) rounded-lg aspect-square">
                <Icon src={icon} color="var(--link)" size={17} />
            </div>
        }
        <div className="flex flex-col gap-0.75">
            <PanelTitle small>{title}</PanelTitle>
            <h3 className="text-xs text-(--secondary)">{subtitle}</h3>
        </div>
    </section>
  )
}