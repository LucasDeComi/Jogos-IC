import { createContext, useState } from "react";
import Patient from "../utils/Patient";
import PatientGame from "../utils/PatientGame";

const gameAssociations = (associations) =>
  associations.map(
    ([gameId, difficulty, movementFocuses]) =>
      new PatientGame(gameId, difficulty, movementFocuses),
  );

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([
    new Patient(
      "0001",
      "Gabriel Souza",
      new Date("2017-05-12"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"]],
        [1, "Fácil", ["Mãos (Gestos finos)", "Cabeça / Pescoço"]],
        [2, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"]],
      ]),
    ),
    new Patient(
      "0002",
      "Leonardo Nunes",
      new Date("2014-03-15"),
      gameAssociations([
        [0, "Médio", ["Pernas (Deslocamento)", "Tronco (Postura)"]],
        [2, "Difícil", ["Pernas (Deslocamento)", "Cabeça / Pescoço"]],
        [3, "Médio", ["Tronco (Postura)", "Cabeça / Pescoço"]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"]],
      ]),
    ),
    new Patient(
      "0003",
      "João Gomes",
      new Date("2005-11-21"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Tronco (Postura)"]],
        [4, "Difícil", ["Pernas (Deslocamento)", "Tronco (Postura)"]],
      ]),
    ),
    new Patient(
      "0004",
      "Manoel Ferreira",
      new Date("1988-02-25"),
      gameAssociations([
        [1, "Fácil", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"]],
        [3, "Médio", ["Pernas (Deslocamento)", "Cabeça / Pescoço"]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Tronco (Postura)"]],
      ]),
    ),
    new Patient(
      "0005",
      "Maria Lopes",
      new Date("2017-12-23"),
      gameAssociations([
        [1, "Fácil", ["Tronco (Postura)", "Cabeça / Pescoço"]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"]],
      ]),
    ),
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
