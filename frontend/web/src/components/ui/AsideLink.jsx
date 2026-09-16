import { NavLink as Link } from "react-router-dom"

export default function AsideLink({ to, children, icon = null }) {
    return (
        <Link to={to}>
            {({ isActive }) => (
                <div className={`flex items-center gap-5 pl-5 py-4 w-full rounded-l-lg transition-colors duration-200
                    ${ isActive ? "bg-[var(--button)]" : "hover:bg-[#2F6F6D70]" }`
                }>
                    { icon && <img src={icon} className="w-8" /> }
                    <div className={`text-white text-lg ${ isActive ? "font-semibold" : "font-medium" }`}>
                        {children}
                    </div>
                </div>
            )}
        </Link>
    )
}