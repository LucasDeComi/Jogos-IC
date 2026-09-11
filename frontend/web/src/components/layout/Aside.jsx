import Link from "../ui/AsideLink"
import logo from "../../assets/icons/logo.svg"
import patients from "../../assets/icons/patients.svg"
import quit from "../../assets/icons/quit.svg"

export default function Aside() {
  return (
    <aside className="inline-flex flex-col items-center gap-15 p-2 pr-0 max-w-full bg-[var(--primary)]">
        <div className="flex gap-3 items-center pl-3 pr-5">
          <img src={logo} className="w-14 md:w-25 shrink-0" />
          <h1 className="max-w-full min-w-0 text-lg text-white font-semibold">
            <span className="whitespace-nowrap">Sistema de Jogos</span>
            <br/>
            <span className="whitespace-nowrap">para Reabilitação</span>
          </h1>
        </div>
        <nav className="flex flex-col gap-2 pl-2 w-full">
            <Link to="/app/patients" icon={patients}>Pacientes</Link>
            <Link to="/app/settings" icon={patients}>Meus dados</Link>
            <Link to="/login" icon={quit}>Sair</Link>
        </nav>
    </aside>
  )
}