import { patientSettings as settings } from "./settings";

export default class Patient {
    constructor(_id, _name, _games = []) {
        this.id = _id;
        this.name = _name;
        this.games = _games;
        this.theme = settings.theme;
        this.style = settings.style;
        this.itemsSize = settings.itemsSize;
        this.contrast = settings.contrast;
        this.useSymbols = settings.useSymbols;
    }

    updateSettings(_theme, _style, _itemsSize, _contrast, _useSymbols) {
        this.theme = _theme;
        this.style = _style;
        this.itemsSize = _itemsSize;
        this.contrast = _contrast;
        this.useSymbols = _useSymbols;
    }
}