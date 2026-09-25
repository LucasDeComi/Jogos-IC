export default class PatientGame {
  constructor(_gameId, _difficulty = "Médio", _movementFocuses = []) {
    this.gameId = _gameId;
    this.difficulty = _difficulty;
    this.movementFocuses = [..._movementFocuses];
  }
}