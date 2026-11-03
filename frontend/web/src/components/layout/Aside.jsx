import { useContext, useState } from "react";
import { TherapistContext } from "../../context/TherapistContext";
import Link from "../ui/AsideLink";
import Icon from "../ui/Icon";
import patients from "../../assets/icons/patients.svg";
import settings from "../../assets/icons/settings.svg";
import quit from "../../assets/icons/quit.svg";
import expand from "../../assets/icons/sidebar-expand.svg";
import collapse from "../../assets/icons/sidebar-collapse.svg";
import light from "../../assets/icons/light.svg";
import dark from "../../assets/icons/dark.svg";

export default function Aside() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { therapist, toggleTheme } = useContext(TherapistContext);
  const currentTheme =
    therapist.theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : therapist.theme;
  const themeButtonIcon = currentTheme === "dark" ? light : dark;
  const themeButtonLabel = currentTheme === "dark" ? "Tema claro" : "Tema escuro";

  return (
    <aside className={`flex shrink-0 flex-col items-center gap-10 bg-(--aside) transition-[width] duration-200 ${isCollapsed ? "w-24 min-w-24 px-3 py-6" : "w-65 min-w-65 px-5 py-8"}`}>
      <div className={`flex items-center w-full ${isCollapsed ? "flex-col justify-center gap-2" : "gap-3"}`}>
        <span className="bg-[#2ED0CC] w-9 h-9 rounded-lg aspect-square" />
        <div className="flex flex-col h-full justify-between">
          <h1
              className="text-white font-extrabold"
              style={{ fontFamily: '"Onest", "Inter", sans-serif' }}
          >
            SJR
          </h1>
          {!isCollapsed && (
            <h2 className="text-[#2ED0CC] text-xs">JOGOS REABILITAÇÃO</h2>
          )}
        </div>
      </div>
      <nav className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-2 w-full">
          <Link
            collapsed={isCollapsed}
            icon={isCollapsed ? expand : collapse}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
          >
            {isCollapsed ? "Expandir" : "Recolher"}
          </Link>
          <Link to="/app/patients" icon={patients} collapsed={isCollapsed}>
            Pacientes
          </Link>
          <Link to="/app/settings" icon={settings} collapsed={isCollapsed}>
            Meus dados
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            onClick={toggleTheme}
            title={themeButtonLabel}
            aria-label={themeButtonLabel}
            className={`mx-auto overflow-visible ${isCollapsed ? "w-16" : "w-full"}`}
          >
            <div
              className={`flex w-full rounded-lg transition-colors duration-200 ${
                isCollapsed
                  ? "min-h-16 flex-col items-center justify-center gap-1.5 px-1 py-2"
                  : "items-center gap-3 px-4 py-3"
              } hover:bg-(--button-hover)`}
            >
              <Icon
                src={themeButtonIcon}
                size={isCollapsed ? 24 : 18}
                color="var(--inactive)"
              />
              {!isCollapsed && (
                <div className="text-sm font-medium text-(--inactive)">
                  {themeButtonLabel}
                </div>
              )}
            </div>
          </button>
          <Link to="/login" icon={quit} collapsed={isCollapsed}>
            {isCollapsed ? "Sair" : "Sair do sistema"}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
