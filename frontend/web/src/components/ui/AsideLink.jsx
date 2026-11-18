import { NavLink as Link } from "react-router-dom"
import Icon from "./Icon"

export default function AsideLink({ to, children, icon = null, collapsed = false, onClick, title }) {
    const windowWidth = window.innerWidth;

    const content = (isActive = false) => (
        <div className={`flex w-full rounded-lg transition-colors duration-200
            ${collapsed ? "min-h-12 lg:min-h-16 flex-col items-center justify-center gap-1.5 px-1 py-1 lg:py-2" : "items-center gap-2 px-3 py-2 lg:gap-3 lg:px-4 lg:py-3"}
            ${isActive ? "bg-(--button) border border-(--button-border)" : "hover:bg-(--button-hover)"}`
        }>
            {icon && <Icon src={icon} size={collapsed && windowWidth >= 1024 ? 24 : 18} color={isActive ? "var(--active)" : "var(--inactive)"} />}
            <div
                className={`text-sm ${collapsed ? "w-12 min-w-0 whitespace-normal text-center text-[8px] lg:text-[10px] leading-tight line-clamp-2" : ""} ${isActive ? "font-semibold text-(--active)" : "font-medium text-(--inactive)"}`}
            >
                {children}
            </div>
        </div>
    )

    if (onClick) {
        return (
            <button type="button" onClick={onClick} title={title} aria-label={title} className={`mx-auto overflow-visible ${collapsed ? "w-16" : "w-full"}`}>
                {content()}
            </button>
        )
    }

    return (
        <Link to={to} title={title} className={`mx-auto overflow-visible ${collapsed ? "block w-12 lg:w-16" : "block w-full"}`}>
            {({ isActive }) => content(isActive)}
        </Link>
    )
}