import { createContext, useState } from "react";
import Patient from "../utils/Patient";
import PatientGame from "../utils/PatientGame";
import TherapistNote from "../utils/TherapistNote";
import { createInitialPatients } from "../data/initialPatients";

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(createInitialPatients);

  function findPatient(id) {
    const patient = patients.filter((patient) => patient.id == id)[0];
    return patient;
  }

  function addPatient(id, name, birthDate, diagnosis) {
    const newPatient = new Patient(id, name, new Date(birthDate), [], diagnosis);
    setPatients([...patients, newPatient]);
  }

  function editPatient(id, theme, style, itemsSize, contrast, useSymbols, soundEffects, voiceInstructions) {
    setPatients(
      patients.map((patient) =>
        patient.id == id
          ? Object.assign(
              Object.create(Object.getPrototypeOf(patient)),
              patient,
              {
                theme,
                style,
                itemsSize,
                contrast,
                useSymbols,
                soundEffects,
                voiceInstructions,
              },
            )
          : patient,
      ),
    );
  }

  function setPatientGames(id, updatedGames) {
    const deduplicatedGames = [
      ...new Map(
        updatedGames.map((association) => {
          const game = new PatientGame(
            association.gameId,
            association.difficulty,
            association.movementFocuses,
            association.evolutionLevel,
            association.supportLevel,
            association.notes,
          );
          return [game.gameId, game];
        }),
      ).values(),
    ];

    setPatients(
      patients.map((patient) =>
        patient.id == id
          ? Object.assign(
              Object.create(Object.getPrototypeOf(patient)),
              patient,
              {
                games: deduplicatedGames,
              },
            )
          : patient,
      ),
    );
  }

  function addTherapistNote({
    patientId,
    gameId,
    therapistName,
    content,
    nextConduct = "",
    dateTime = new Date(),
  }) {
    setPatients((currentPatients) => {
      const allNotes = currentPatients.flatMap((patient) =>
        (patient.games ?? []).flatMap((game) => game.notes ?? []),
      );
      const nextId = Math.max(0, ...allNotes.map((note) => note.id)) + 1;

      return currentPatients.map((patient) => {
        if (patient.id !== patientId) {
          return patient;
        }

        return Object.assign(
          Object.create(Object.getPrototypeOf(patient)),
          patient,
          {
            games: (patient.games ?? []).map((game) =>
              game.gameId === gameId
                ? new PatientGame(
                    game.gameId,
                    game.difficulty,
                    game.movementFocuses,
                    game.evolutionLevel,
                    game.supportLevel,
                    [
                      ...(game.notes ?? []),
                      new TherapistNote(
                        nextId,
                        patientId,
                        gameId,
                        therapistName,
                        content,
                        dateTime,
                        nextConduct,
                      ),
                    ],
                  )
                : game,
            ),
          },
        );
      });
    });
  }

  function findNotesByPatient(patientId) {
    const patient = patients.find((item) => item.id === patientId);
    return (patient?.games ?? []).flatMap((game) => game.notes ?? []);
  }

  function findTherapistNote(noteId) {
    return patients
      .flatMap((patient) =>
        (patient.games ?? []).flatMap((game) => game.notes ?? []),
      )
      .find((note) => String(note.id) === String(noteId));
  }

  function editTherapistNote({ patientId, noteId, content, nextConduct }) {
    setPatients((currentPatients) =>
      currentPatients.map((patient) => {
        if (patient.id !== patientId) {
          return patient;
        }

        return Object.assign(
          Object.create(Object.getPrototypeOf(patient)),
          patient,
          {
            games: (patient.games ?? []).map((game) => {
              const hasNote = (game.notes ?? []).some(
                (note) => String(note.id) === String(noteId),
              );

              return hasNote
                ? new PatientGame(
                    game.gameId,
                    game.difficulty,
                    game.movementFocuses,
                    game.evolutionLevel,
                    game.supportLevel,
                    game.notes.map((note) =>
                      String(note.id) === String(noteId)
                        ? new TherapistNote(
                            note.id,
                            note.patientId,
                            note.gameId,
                            note.therapistName,
                            content,
                            note.dateTime,
                            nextConduct,
                          )
                        : note,
                    ),
                  )
                : game;
            }),
          },
        );
      }),
    );
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        setPatients,
        findPatient,
        addPatient,
        editPatient,
        setPatientGames,
        addTherapistNote,
        editTherapistNote,
        findTherapistNote,
        findNotesByPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
