import { createContext, useState } from "react";
import Patient from "../utils/Patient";
import PatientGame from "../utils/PatientGame";

const gameAssociation = (gameId, difficulty) =>
  new PatientGame(gameId, difficulty);

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([
    new Patient("0001", "Gabriel Souza", new Date("2017-05-12"), [
      gameAssociation(0, "Médio"),
      gameAssociation(1, "Fácil"),
      gameAssociation(2, "Difícil"),
    ]),
    new Patient("0002", "Leonardo Nunes", new Date("2014-03-15"), [
      gameAssociation(0, "Médio"),
      gameAssociation(2, "Difícil"),
      gameAssociation(3, "Médio"),
      gameAssociation(4, "Difícil"),
    ]),
    new Patient("0003", "João Gomes", new Date("2005-11-21"), [
      gameAssociation(0, "Médio"),
      gameAssociation(2, "Difícil"),
      gameAssociation(4, "Difícil"),
    ]),
    new Patient("0004", "Manoel Ferreira", new Date("1988-02-25"), [
      gameAssociation(1, "Fácil"),
      gameAssociation(3, "Médio"),
      gameAssociation(4, "Difícil"),
    ]),
    new Patient("0005", "Maria Lopes", new Date("2017-12-23"), [
      gameAssociation(1, "Fácil"),
      gameAssociation(2, "Difícil"),
      gameAssociation(4, "Difícil"),
      gameAssociation(5, "Médio"),
    ]),
  ]);

  function findPatient(id) {
    const patient = patients.filter((patient) => patient.id == id)[0];
    return patient;
  }

  function addPatient(id, name, birthDate) {
    const newPatient = new Patient(id, name, new Date(birthDate));
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
        updatedGames.map((association) => [
          association.gameId,
          {
            ...association,
            movementFocuses: [...(association.movementFocuses ?? [])],
          },
        ]),
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

  return (
    <PatientContext.Provider
      value={{
        patients,
        setPatients,
        findPatient,
        addPatient,
        editPatient,
        setPatientGames,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
