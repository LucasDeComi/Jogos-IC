import User from "./User";
import { patientSettings as settings } from "./settings";

export default class Patient extends User {
    constructor(_id, _name, _birthDate, _games = []) {
        super(_name);
        this.id = _id;
        this.birthDate = _birthDate;
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

    getAge() {
        const now = new Date();
        const age = now.getFullYear() - this.birthDate.getFullYear() - (now.getMonth() < this.birthDate.getMonth() ? 1 : 0);
        return age;
    }
}