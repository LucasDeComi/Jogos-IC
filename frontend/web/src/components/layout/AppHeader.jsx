import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TherapistContext } from "../../context/TherapistContext";
import User from "../../utils/User";
import Button from "../ui/HeaderButton";
import Select from "../ui/Select";
import Panel from "../ui/Panel";
import Icon from "../ui/Icon";
import menuIcon from "../../assets/icons/menu.svg";
import lightIcon from "../../assets/icons/light.svg";
import darkIcon from "../../assets/icons/dark.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import arrow from "../../assets/icons/arrow.svg";
import personIcon from "../../assets/icons/person.svg";
import quitIcon from "../../assets/icons/quit.svg";

export default function Header() {
    const { therapist, setTherapistTheme, toggleSidebar } = useContext(TherapistContext);
    const [systemPrefersDark, setSystemPrefersDark] = useState(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();
    const therapistIdentity = new User(therapist.name);

    useEffect(() => {
        const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const updateSystemTheme = (event) => setSystemPrefersDark(event.matches);

        colorScheme.addEventListener("change", updateSystemTheme);
        return () => colorScheme.removeEventListener("change", updateSystemTheme);
    }, []);

    useEffect(() => {
        if (!isProfileMenuOpen) return undefined;

        const closeOnOutsideClick = (event) => {
            if (!profileMenuRef.current?.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsProfileMenuOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isProfileMenuOpen]);

    const currentTheme = therapist.theme === "auto"
        ? systemPrefersDark ? "dark" : "light"
        : therapist.theme;

    function navigateFromProfileMenu(path) {
        setIsProfileMenuOpen(false);
        navigate(path);
    }

    return (
        <header className="mx-4 flex items-center justify-end border-b border-b-(--border) pt-3 pb-3 sm:mx-6 sm:pt-4 md:mx-8 md:justify-between md:pt-5 md:pb-4 xl:mx-10">
            <section className="hidden lg:flex items-center gap-2 lg:gap-3">
                <Button
                    icon={menuIcon}
                    onClick={toggleSidebar}
                    ariaLabel={therapist.isSidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
                    title={therapist.isSidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
                />
            </section>
            <section className="flex items-center gap-2 sm:gap-3">
                <Select
                    containerClassName="w-fit max-w-40 shrink-0 sm:max-w-none"
                    className="rounded-[10px] py-2 font-semibold"
                    compact
                    value={therapist.theme}
                    onChange={(event) => setTherapistTheme(event.target.value)}
                    icon={currentTheme === "dark" ? darkIcon : lightIcon}
                    iconColor="var(--primary)"
                    aria-label="Tema de tela"
                >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                </Select>
                <div className="hidden sm:block">
                    <Button icon={settingsIcon} onClick={() => navigate("/app/settings")} />
                </div>
                <div className="relative" ref={profileMenuRef}>
                    <Panel className="w-auto p-0 rounded-xl">
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={isProfileMenuOpen}
                            aria-controls="therapist-profile-menu"
                            onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                            className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-(--input) sm:gap-2 sm:px-2.5"
                        >
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--transparent) text-xs font-bold text-(--primary) sm:h-8 sm:w-8 sm:text-[13px]">
                                {therapistIdentity.getInitials()}
                            </span>
                            <div className="hidden max-w-40 flex-col gap-0.5 overflow-hidden text-left sm:flex">
                                <h4 className="truncate text-[13px] font-semibold text-(--text)">
                                    {therapistIdentity.getName()}
                                </h4>
                                <span className="hidden text-[11px] text-(--secondary) md:inline">
                                    3 notificações
                                </span>
                            </div>
                            <Icon src={arrow} size={8} color="var(--secondary)" />
                        </button>
                    </Panel>
                    {isProfileMenuOpen && (
                        <Panel
                            id="therapist-profile-menu"
                            className="absolute right-0 top-full z-20 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-xl p-1 shadow-lg"
                        >
                            <div role="menu" aria-label="Menu do terapeuta" className="flex flex-col">
                                <button
                                    type="button"
                                    role="menuitem"
                                    disabled
                                    title="Em breve"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text) opacity-60 cursor-not-allowed"
                                >
                                    <Icon src={personIcon} size={16} color="var(--secondary)" />
                                    Abrir perfil
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => navigateFromProfileMenu("/app/settings")}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text) transition-colors hover:bg-(--input)"
                                >
                                    <Icon src={settingsIcon} size={16} color="var(--secondary)" />
                                    Configurações
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => navigateFromProfileMenu("/login")}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-(--text) transition-colors hover:bg-(--input)"
                                >
                                    <Icon src={quitIcon} size={16} color="var(--secondary)" />
                                    Sair do sistema
                                </button>
                            </div>
                        </Panel>
                    )}
                </div>
            </section>
        </header>
    )
}