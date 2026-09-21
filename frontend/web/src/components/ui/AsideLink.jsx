import { NavLink as Link } from "react-router-dom"
import Icon from "./Icon"

export default function AsideLink({ to, children, icon = null }) {
    return (
        <Link to={to}>
            {({ isActive }) => (
                <div className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors duration-200
                    ${ isActive ? "bg-(--button) border border-(--button-border)" : "hover:bg-(--button-hover)" }`
                }>
                    { icon && <Icon src={icon} size={18} color={isActive ? "var(--active)" : "var(--inactive)" } /> }
                    <div className={` text-sm ${ isActive ? "font-semibold text-(--active)" : "font-medium text-(--inactive)" }`}>
                        {children}
                    </div>
                </div>
            )}
        </Link>
    )
}