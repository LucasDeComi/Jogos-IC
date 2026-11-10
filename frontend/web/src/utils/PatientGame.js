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
    const evolutionLevel = _evolutionLevel ?? "Média";
    const supportLevel = _supportLevel ?? "Médio";
    this.gameId = _gameId;
    this.difficulty = _difficulty;
    this.movementFocuses = [..._movementFocuses];
    this.evolutionLevel = evolutionLevel;
    this.supportLevel = supportLevel;
    this.notes = [..._notes];
    this.sessions = _sessions.map((session) => ({
      ...session,
      dateTime: new Date(session.dateTime),
      duration: session.duration ?? 22,
      evolutionLevel: session.evolutionLevel ?? evolutionLevel,
      supportLevel: session.supportLevel ?? supportLevel,
    }));
  }
}