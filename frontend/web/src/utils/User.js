export default class User {
    constructor(_name) {
        this.name = _name;
    }

    getInitials() {
        const nameSplit = this.name.split(" ");
        if(nameSplit.length <= 1) return this.name[0].toUpperCase();

        const firstName = nameSplit[0];
        const lastName = nameSplit.at(-1);
        const initials = `${firstName[0]}${lastName[0]}`;
        
        return initials.toUpperCase();
    }
}