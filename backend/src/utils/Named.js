import normalize from "./normalizeText.js"

export default class Named {
    constructor(_name) {
        const normalizedName = normalize(_name);
        this.name = _name;
        this.normalizedName = normalizedName;
    }
}