export default class TherapistNote {
  constructor(
    _id,
    _patientId,
    _gameId,
    _therapistName,
    _content,
    _dateTime,
    _nextConduct = "",
    _sessionId = null,
  ) {
    this.id = _id;
    this.patientId = _patientId;
    this.gameId = _gameId;
    this.therapistName = _therapistName;
    this.content = _content;
    this.dateTime = new Date(_dateTime);
    this.nextConduct = _nextConduct;
    this.sessionId = _sessionId;
  }
}
