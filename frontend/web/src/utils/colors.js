export class BlockColor {
    constructor(_background, _text) {
        this.background = _background;
        this.text = _text;
    }
}

export const profileColors = ["#8075E3", "#38B2AC", "#ED8936", "#E53E3E", "#319795"];

export const blockColors = {
    green: new BlockColor("#E6F4F4", "#0B4F4E"),
    gray: new BlockColor("#F4F7F6", "#718096"),
    red: new BlockColor("#FFF0F0", "#E53E3E"),
};