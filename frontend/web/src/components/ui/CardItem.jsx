import { Children } from "react";
import Icon from "./Icon";

export default function CardItem({ colors, icon = null, children }) {
  const hasChildren = Children.toArray(children).length > 0;

  if (!icon && !hasChildren) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-sm"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {icon && <Icon src={icon} size={12} color={colors.text} />}
      {hasChildren && <span>{children}</span>}
    </div>
  )
}