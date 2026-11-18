import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TherapistContext } from "../../context/TherapistContext";
import Link from "../ui/AsideLink";
import Icon from "../ui/Icon";
import logo from "../../assets/icons/darkLogo.png";
import patients from "../../assets/icons/patients.svg";
import settings from "../../assets/icons/settings.svg";
import quit from "../../assets/icons/quit.svg";

export default function Aside() {
  const { therapist } = useContext(TherapistContext);
  const [isTablet, setIsTablet] = useState(() =>
    window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches,
  );

  useEffect(() => {
    const tabletQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)",
    );
    const updateTabletLayout = (event) => setIsTablet(event.matches);

    tabletQuery.addEventListener("change", updateTabletLayout);
    return () => tabletQuery.removeEventListener("change", updateTabletLayout);
  }, []);

  const isCollapsed = isTablet || therapist.isSidebarCollapsed;
  const mobileLinkClass = ({ isActive }) =>
    `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold transition-colors ${
      isActive ? "text-(--link)" : "text-(--secondary)"
    }`;

  return (
    <>
      <aside className={`hidden md:flex shrink-0 flex-col items-center bg-(--aside) transition-[width] duration-200 ${isCollapsed ? "w-16 min-w-16 gap-7.5 px-2 py-4 lg:w-24 lg:min-w-24 lg:gap-10 lg:px-3 lg:py-6" : "w-65 min-w-65 gap-7.5 px-5 py-8 lg:gap-10"}`}>
        <div className={`flex w-full items-center ${isCollapsed ? "flex-col justify-center gap-2" : "gap-3"}`}>
          <img src={logo} alt="SJR" className={isCollapsed ? "h-9 w-9 lg:h-10.5 lg:w-10.5" : "h-10 w-10 lg:h-12 lg:w-12"} />
          <div className="flex h-full flex-col justify-around">
            <h1
                className="text-sm font-extrabold text-white lg:text-[16px]"
                style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
            >
              SJR
            </h1>
            {!isCollapsed && (
              <h2 className="text-[10px] text-[#2ED0CC] lg:text-xs">JOGOS REABILITAÇÃO</h2>
            )}
          </div>
        </div>
        <nav aria-label="Navegação principal" className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full flex-col gap-2">
            <Link to="/app/patients" icon={patients} collapsed={isCollapsed}>
              Pacientes
            </Link>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Link to="/app/settings" icon={settings} collapsed={isCollapsed}>
              {isCollapsed ? "Config." : "Configurações"}
            </Link>
            <Link to="/login" icon={quit} collapsed={isCollapsed}>
              {isCollapsed ? "Sair" : "Sair do sistema"}
            </Link>
          </div>
        </nav>
      </aside>

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-1 border-t border-(--border) bg-(--panel) px-2 pt-2 pb-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] md:hidden"
      >
        <NavLink to="/app/patients" className={mobileLinkClass}>
          <Icon src={patients} size={19} color="currentColor" />
          <span>Pacientes</span>
        </NavLink>
        <NavLink to="/app/settings" className={mobileLinkClass}>
          <Icon src={settings} size={19} color="currentColor" />
          <span>Configurações</span>
        </NavLink>
        <NavLink to="/login" className={mobileLinkClass}>
          <Icon src={quit} size={19} color="currentColor" />
          <span>Sair</span>
        </NavLink>
      </nav>
    </>
  );
}
