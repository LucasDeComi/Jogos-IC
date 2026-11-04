import { createContext, useState } from "react";
import { createInitialTherapist } from "../data/initialTherapist";

export const TherapistContext = createContext();

export function TherapistProvider({ children }) {
    const [therapist, setTherapist] = useState(createInitialTherapist);

    function editTherapist(name, email, password, theme, style, itemsSize, contrast) {
        setTherapist({
            ...therapist,
            name,
            email,
            password,
            theme,
            style,
            itemsSize,
            contrast
        })
    }

    function toggleTheme() {
        setTherapist((current) => ({
            ...current,
            theme: current.theme === "dark" || (current.theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "light" : "dark",
        }));
    }

    function setTherapistTheme(theme) {
        setTherapist((current) => ({ ...current, theme }));
    }

    function toggleSidebar() {
        setTherapist((current) => ({
            ...current,
            isSidebarCollapsed: !current.isSidebarCollapsed,
        }));
    }

    return (
        <TherapistContext.Provider value={{ therapist, editTherapist, toggleTheme, setTherapistTheme, toggleSidebar }}>
            { children }
        </TherapistContext.Provider>
    )
}