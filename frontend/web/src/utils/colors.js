import { useContext } from "react";
import { TherapistContext } from "../context/TherapistContext"

export class BlockColor {
    constructor(_background, _text) {
        this.background = _background;
        this.text = _text;
    }
}

export class CardColor {
    constructor(_background, _title, _text) {
        this.background = _background;
        this.title = _title;
        this.text = _text;
    }
}

export const profileColors = ["#8075E3", "#38B2AC", "#ED8936", "#E53E3E", "#319795"];

export function blockColors() {
    const { therapist } = useContext(TherapistContext);
    const theme = therapist.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"  : therapist.theme;

    return {
        green: theme === "light" ? new BlockColor("#E6F4F4", "#0B4F4E") : new BlockColor("#113A3C", "#1CC2C0"),
        gray: theme === "light" ? new BlockColor("#F4F7F6", "#718096") : new BlockColor("#161D2C", "#9CA3AF"),
        red: theme === "light" ? new BlockColor("#FFF0F0", "#E53E3E") : new BlockColor("#3A161D", "#F56565"),
        yellow: theme === "light" ? new BlockColor("#FFF8E6", "#B7791F") : new BlockColor("#3A2E16", "#ECC94B"),
        purple: theme === "light" ? new BlockColor("#F3E8FF", "#6B21A8") : new BlockColor("#322659", "#D6BCFA"),
    }
};

export function cardColors() {
    const { therapist } = useContext(TherapistContext);
    const theme = therapist.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : therapist.theme;

    return {
        green: theme === "light"
            ? new CardColor("#E6F4F4", "#0F7675", "#0B4F4E")
            : new CardColor("#113A3C", "#1CC2C0", "#1CC2C0"),

        gray: theme === "light"
            ? new CardColor("#F4F7F6", "#718096", "#1a202c")
            : new CardColor("#161D2C", "#D1D5DB", "#9CA3AF"),

        red: theme === "light"
            ? new CardColor("#FFF0F0", "#C53030", "#E53E3E")
            : new CardColor("#3A161D", "#FC8181", "#F56565"),

        yellow: theme === "light"
            ? new CardColor("#FFF8E6", "#975A16", "#B7791F")
            : new CardColor("#3A2E16", "#F6E05E", "#ECC94B"),

        purple: theme === "light"
            ? new CardColor("#F3E8FF", "#7E22CE", "#6B21A8")
            : new CardColor("#322659", "#D6BCFA", "#D6BCFA"),
    };
}