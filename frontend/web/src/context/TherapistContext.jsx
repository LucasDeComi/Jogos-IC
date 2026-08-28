import { createContext, useState } from "react";
import Therapist from "../utils/Therapist";

export const TherapistContext = createContext();

export function TherapistProvider({ children }) {
    const [therapist, setTherapist] = useState(
        new Therapist("Fábio Oliveira", "terapeuta@email.com", "1234")
    );

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

    return (
        <TherapistContext.Provider value={{ therapist, editTherapist }}>
            { children }
        </TherapistContext.Provider>
    )
}