import { useContext } from "react";
import { TherapistContext } from "../context/TherapistContext"


export class BlockColor {
    constructor(_background, _text) {
        this.background = _background;
        this.text = _text;
    }
}

export const profileColors = ["#8075E3", "#38B2AC", "#ED8936", "#E53E3E", "#319795"];

export function blockColors() {
    const { theme } = useContext(TherapistContext);

    return {
        green: theme === "light" ? new BlockColor("#E6F4F4", "#0B4F4E") : new BlockColor("#113A3C", "#1CC2C0"),
        gray: theme === "light" ? new BlockColor("#F4F7F6", "#718096") : new BlockColor("#161D2C", "#9CA3AF"),
        red: theme === "light" ? new BlockColor("#FFF0F0", "#E53E3E") : new BlockColor("#3A161D", "#F56565"),
    }
};