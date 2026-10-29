export default class PatientGame {
  constructor(
    _gameId,
    _difficulty = "Médio",
    _movementFocuses = [],
    _evolutionLevel = "Média",
    _supportLevel = "Médio",
    _notes = [],
    _sessions = [],
  ) {
    this.gameId = _gameId;
    this.difficulty = _difficulty;
    this.movementFocuses = [..._movementFocuses];
    this.evolutionLevel = _evolutionLevel;
    this.supportLevel = _supportLevel;
    this.notes = [..._notes];
    this.sessions = _sessions.map((session) => ({
      ...session,
      dateTime: new Date(session.dateTime),
    }));
  }
}