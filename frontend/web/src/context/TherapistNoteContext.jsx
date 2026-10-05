import { createContext, useState } from "react";
import TherapistNote from "../utils/TherapistNote";

export const TherapistNoteContext = createContext();

const initialNotes = [
  new TherapistNote(
    1,
    "0001",
    0,
    "Mariana Costa",
    "Manteve a atenção durante a atividade e concluiu as etapas com mais precisão.",
    "2026-06-10T14:00:00",
    "Alta",
    "Mínimo",
  ),
  new TherapistNote(
    2,
    "0001",
    1,
    "Rafael Martins",
    "Precisou de incentivo para iniciar, mas completou as tarefas de memória visual.",
    "2026-06-08T15:30:00",
    "Média",
    "Médio",
  ),
  new TherapistNote(
    3,
    "0002",
    2,
    "Helena Almeida",
    "Apresentou dificuldade na coordenação dos movimentos e se beneficiou de orientações frequentes.",
    "2026-06-06T10:15:00",
    "Baixa",
    "Alto",
  ),
  new TherapistNote(
    4,
    "0003",
    4,
    "Daniel Ribeiro",
    "Realizou a atividade com autonomia e demonstrou melhora na organização das respostas.",
    "2026-06-04T11:45:00",
    "Alta",
    "Mínimo",
  ),
  new TherapistNote(
    5,
    "0004",
    3,
    "Beatriz Ferreira",
    "Acompanhou as instruções com suporte pontual e concluiu a maior parte da atividade.",
    "2026-06-02T09:20:00",
    "Média",
    "Médio",
  ),
  new TherapistNote(
    6,
    "0005",
    1,
    "Lucas Carvalho",
    "Precisou de apoio contínuo para manter o foco e avançar nas etapas propostas.",
    "2026-05-29T13:10:00",
    "Baixa",
    "Alto",
  ),
];

export function TherapistNoteProvider({ children }) {
  const [notes, setNotes] = useState(initialNotes);

  function findNotesByPatient(patientId) {
    return notes.filter((note) => note.patientId === patientId);
  }

  function addNote({
    patientId,
    gameId,
    therapistName,
    content,
    dateTime = new Date(),
    evolutionLevel,
    supportLevel,
  }) {
    setNotes((currentNotes) => {
      const nextId = Math.max(0, ...currentNotes.map((note) => note.id)) + 1;
      return [
        ...currentNotes,
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
      ];
    });
  }

  return (
    <TherapistNoteContext.Provider
      value={{ notes, setNotes, findNotesByPatient, addNote }}
    >
      {children}
    </TherapistNoteContext.Provider>
  );
}
