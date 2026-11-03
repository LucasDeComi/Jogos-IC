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
            theme: current.theme === "dark" ? "light" : "dark",
        }));
    }

    return (
        <TherapistContext.Provider value={{ therapist, editTherapist, toggleTheme }}>
            { children }
        </TherapistContext.Provider>
    )
}