import { Link } from "react-router-dom";
import backIcon from "../../assets/icons/back.svg";

export default function BackLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-(--link) text-sm font-semibold transition-colors duration-200 hover:underline ${className}`}
    >
      <img src={backIcon} alt="" className="h-3 w-3 shrink-0" />
      <span>{children}</span>
    </Link>
  );
}
