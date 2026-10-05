export default class TherapistNote {
  constructor(
    _id,
    _patientId,
    _gameId,
    _therapistName,
    _content,
    _dateTime,
    _evolutionLevel,
    _supportLevel,
  ) {
    this.id = _id;
    this.patientId = _patientId;
    this.gameId = _gameId;
    this.therapistName = _therapistName;
    this.content = _content;
    this.dateTime = new Date(_dateTime);
    this.evolutionLevel = _evolutionLevel;
    this.supportLevel = _supportLevel;
  }
}
