export default class Game {
  constructor(_name, _category, _skill, _color, _movementFocuses = []) {
    this.name = _name;
    this.category = _category;
    this.skill = _skill;
    this.color = _color;
    this.movementFocuses = [..._movementFocuses];
  }
}