export default class User {
    constructor(_name) {
        this.name = _name;
    }

    getInitials() {
        const nameSplit = this.name.split(" ");
        const firstName = nameSplit[0];
        const lastName = nameSplit.at(-1);
        const initials = `${firstName[0]}${lastName[0]}`;
        
        return initials.toUpperCase();
    }
}