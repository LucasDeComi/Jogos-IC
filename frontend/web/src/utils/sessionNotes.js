export function findNoteForSession(notes = [], session) {
  if (!session) {
    return undefined;
  }

  const sessionDate = new Date(session.dateTime).getTime();

  return notes.find((note) => {
    const noteSessionId = note.sessionId ?? note.id;
    const matchesSessionId = String(noteSessionId) === String(session.id);
    const matchesSessionDate =
      !note.sessionId &&
      new Date(note.dateTime).getTime() === sessionDate;

    return matchesSessionId || matchesSessionDate;
  });
}
