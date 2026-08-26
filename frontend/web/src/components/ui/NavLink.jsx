import { NavLink as Link } from "react-router-dom"

export default function NavLink({ to, children }) {
  return (
    <Link
        to={to}
        className={({ isActive }) =>
          `text-lg py-1 border-b-2 hover:font-semibold 
          ${ isActive ? "font-semibold px-5 border-black" : "border-transparent"}`
        }
    >
        {children}
    </Link>
  )
}