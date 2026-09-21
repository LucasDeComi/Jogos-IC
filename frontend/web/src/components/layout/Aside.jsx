import Link from "../ui/AsideLink";
import logo from "../../assets/icons/logo.svg";
import patients from "../../assets/icons/patients.svg";
import settings from "../../assets/icons/settings.svg";
import quit from "../../assets/icons/quit.svg";

export default function Aside() {
  return (
    <aside className="flex flex-col items-center gap-10 px-5 py-8 min-w-65 bg-(--aside)">
      <div className="flex gap-3 items-center w-full">
        <span className="bg-[#2ED0CC] w-9 h-9 rounded-lg" />
        <div className="flex flex-col h-full justify-between">
          <h1
            className="text-white font-extrabold"
            style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
          >
            SJR
          </h1>
          <h2 className="text-[#2ED0CC] text-xs">JOGOS REABILITAÇÃO</h2>
        </div>
      </div>
      <nav className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-2 w-full">
          <Link to="/app/patients" icon={patients}>
            Pacientes
          </Link>
          <Link to="/app/settings" icon={settings}>
            Meus dados
          </Link>
        </div>
        <Link to="/login" icon={quit}>
          Sair do sistema
        </Link>
      </nav>
    </aside>
  );
}
