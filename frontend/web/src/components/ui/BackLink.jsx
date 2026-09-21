import { Link } from "react-router-dom";
import Icon from "./Icon";
import backIcon from "../../assets/icons/back.svg";

export default function BackLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-(--link) text-sm font-semibold transition-colors duration-200 hover:underline ${className}`}
    >
      <Icon src={backIcon} size={12} color="var(--link)" />
      <span>{children}</span>
    </Link>
  );
}
