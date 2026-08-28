import { therapistSettings as settings } from "./settings";

export default class Therapist {
    constructor(_name, _email, _password) { 
        this.name = _name;
        this.email = _email;
        this.password = _password;
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