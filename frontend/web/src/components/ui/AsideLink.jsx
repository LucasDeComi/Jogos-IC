import { NavLink as Link } from "react-router-dom"

export default function AsideLink({ to, children, icon = null }) {
    return (
        <Link to={to}>
            {({ isActive }) => (
                <div className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors duration-200 border
                    ${ isActive ? "bg-[var(--button)] border-[#149B99]" : "hover:bg-[#2F6F6D70]" }`
                }>
                    { icon && <img src={icon} className="w-4.5" /> }
                    <div className={`text-white text-sm ${ isActive ? "font-semibold" : "font-medium" }`}>
                        {children}
                    </div>
                </div>
            )}
        </Link>
    )
}