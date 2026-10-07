import { createContext, useState } from "react";
import Patient from "../utils/Patient";
import PatientGame from "../utils/PatientGame";
import TherapistNote from "../utils/TherapistNote";

const gameAssociations = (associations) =>
  associations.map(
    ([gameId, difficulty, movementFocuses, notes = []]) =>
      new PatientGame(gameId, difficulty, movementFocuses, notes),
  );

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([
    new Patient(
      "0001",
      "Gabriel Souza",
      new Date("2017-05-12"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"], [
          new TherapistNote(1, "0001", 0, "Mariana Costa", "Manteve a atenção durante a atividade e concluiu as etapas com mais precisão.", "2026-06-10T14:00:00", "Alta", "Mínimo"),
          new TherapistNote(7, "0001", 0, "Mariana Costa", "Aumentou a precisão ao selecionar os estímulos e precisou de menos lembretes.", "2026-10-03T14:00:00", "Alta", "Mínimo"),
        ]],
        [1, "Fácil", ["Mãos (Gestos finos)", "Cabeça / Pescoço"], [
          new TherapistNote(2, "0001", 1, "Rafael Martins", "Precisou de incentivo para iniciar, mas completou as tarefas de memória visual.", "2026-06-08T15:30:00", "Média", "Médio"),
          new TherapistNote(8, "0001", 1, "Rafael Martins", "Completou as etapas com autonomia e manteve a atenção até o fim.", "2026-09-16T15:30:00", "Alta", "Mínimo"),
        ]],
        [2, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], [
          new TherapistNote(9, "0001", 2, "Helena Almeida", "Precisou de suporte pontual para coordenar os movimentos, com melhora no ritmo.", "2026-10-06T10:00:00", "Média", "Médio"),
        ]],
      ]),
    ),
    new Patient(
      "0002",
      "Leonardo Nunes",
      new Date("2014-03-15"),
      gameAssociations([
        [0, "Médio", ["Pernas (Deslocamento)", "Tronco (Postura)"], [
          new TherapistNote(10, "0002", 0, "Beatriz Ferreira", "Manteve a postura durante a atividade e concluiu as etapas propostas.", "2026-09-30T09:30:00", "Média", "Mínimo"),
        ]],
        [2, "Difícil", ["Pernas (Deslocamento)", "Cabeça / Pescoço"], [
          new TherapistNote(3, "0002", 2, "Helena Almeida", "Apresentou dificuldade na coordenação dos movimentos e se beneficiou de orientações frequentes.", "2026-06-06T10:15:00", "Baixa", "Alto"),
          new TherapistNote(11, "0002", 2, "Helena Almeida", "Respondeu melhor às instruções e realizou mais movimentos sem ajuda física.", "2026-10-04T10:15:00", "Média", "Médio"),
        ]],
        [3, "Médio", ["Tronco (Postura)", "Cabeça / Pescoço"], [
          new TherapistNote(12, "0002", 3, "Daniel Ribeiro", "Seguiu a sequência com poucas pistas verbais.", "2026-09-12T11:00:00", "Média", "Médio"),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], [
          new TherapistNote(13, "0002", 4, "Lucas Carvalho", "Demonstrou maior controle dos braços durante as tarefas de alcance.", "2026-08-20T13:00:00", "Média", "Médio"),
        ]],
      ]),
    ),
    new Patient(
      "0003",
      "João Gomes",
      new Date("2005-11-21"),
      gameAssociations([
        [0, "Médio", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"], [
          new TherapistNote(14, "0003", 0, "Rafael Martins", "Realizou a atividade com ritmo constante e boa coordenação das mãos.", "2026-10-02T14:30:00", "Alta", "Mínimo"),
        ]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Tronco (Postura)"], [
          new TherapistNote(15, "0003", 2, "Mariana Costa", "Concluiu as etapas com menos pausas e manteve uma postura estável.", "2026-09-25T10:30:00", "Alta", "Mínimo"),
        ]],
        [4, "Difícil", ["Pernas (Deslocamento)", "Tronco (Postura)"], [
          new TherapistNote(4, "0003", 4, "Daniel Ribeiro", "Realizou a atividade com autonomia e demonstrou melhora na organização das respostas.", "2026-06-04T11:45:00", "Alta", "Mínimo"),
          new TherapistNote(16, "0003", 4, "Daniel Ribeiro", "Organizou as respostas com autonomia e precisou de menos tempo para concluir.", "2026-09-10T11:45:00", "Alta", "Mínimo"),
          new TherapistNote(17, "0003", 4, "Beatriz Ferreira", "Manteve o desempenho e identificou os erros sem orientação direta.", "2026-10-05T11:45:00", "Alta", "Mínimo"),
        ]],
      ]),
    ),
    new Patient(
      "0004",
      "Manoel Ferreira",
      new Date("1988-02-25"),
      gameAssociations([
        [1, "Fácil", ["Mãos (Gestos finos)", "Braços (Coordenação ampla)"], [
          new TherapistNote(18, "0004", 1, "Lucas Carvalho", "Realizou os movimentos com maior controle e aceitou bem as orientações.", "2026-09-22T13:15:00", "Média", "Médio"),
        ]],
        [3, "Médio", ["Pernas (Deslocamento)", "Cabeça / Pescoço"], [
          new TherapistNote(5, "0004", 3, "Beatriz Ferreira", "Acompanhou as instruções com suporte pontual e concluiu a maior parte da atividade.", "2026-06-02T09:20:00", "Média", "Médio"),
          new TherapistNote(19, "0004", 3, "Beatriz Ferreira", "Completou todas as etapas com lembretes verbais pontuais.", "2026-10-01T09:20:00", "Média", "Médio"),
          new TherapistNote(20, "0004", 3, "Helena Almeida", "Precisou de apoio frequente para iniciar os movimentos, mas concluiu a atividade.", "2026-08-01T09:20:00", "Baixa", "Alto"),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Tronco (Postura)"], [
          new TherapistNote(21, "0004", 4, "Mariana Costa", "Manteve o equilíbrio durante os movimentos e concluiu as tarefas propostas.", "2026-10-06T15:00:00", "Média", "Médio"),
        ]],
      ]),
    ),
    new Patient(
      "0005",
      "Maria Lopes",
      new Date("2017-12-23"),
      gameAssociations([
        [1, "Fácil", ["Tronco (Postura)", "Cabeça / Pescoço"], [
          new TherapistNote(6, "0005", 1, "Lucas Carvalho", "Precisou de apoio contínuo para manter o foco e avançar nas etapas propostas.", "2026-05-29T13:10:00", "Baixa", "Alto"),
          new TherapistNote(22, "0005", 1, "Lucas Carvalho", "Manteve o foco por mais tempo e precisou de menos apoio para avançar.", "2026-10-04T13:10:00", "Média", "Médio"),
        ]],
        [2, "Difícil", ["Mãos (Gestos finos)", "Pernas (Deslocamento)"], [
          new TherapistNote(23, "0005", 2, "Rafael Martins", "Coordenou os movimentos com mais segurança e concluiu a sequência.", "2026-09-29T10:00:00", "Média", "Médio"),
        ]],
        [4, "Difícil", ["Braços (Coordenação ampla)", "Cabeça / Pescoço"], [
          new TherapistNote(24, "0005", 4, "Daniel Ribeiro", "Respondeu às instruções com mais consistência durante o jogo.", "2026-09-18T11:30:00", "Média", "Médio"),
          new TherapistNote(25, "0005", 4, "Beatriz Ferreira", "Finalizou a atividade com suporte verbal pontual.", "2026-07-15T11:30:00", "Média", "Médio"),
        ]],
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
        updatedGames.map((association) => {
          const game = new PatientGame(
            association.gameId,
            association.difficulty,
            association.movementFocuses,
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
    dateTime = new Date(),
    evolutionLevel,
    supportLevel,
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
                ? new PatientGame(game.gameId, game.difficulty, game.movementFocuses, [
                    ...(game.notes ?? []),
                    new TherapistNote(
                      nextId,
                      patientId,
                      gameId,
                      therapistName,
                      content,
                      dateTime,
                      evolutionLevel,
                      supportLevel,
                    ),
                  ])
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
        findNotesByPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
