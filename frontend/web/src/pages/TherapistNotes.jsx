import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import PatientHeader from "../components/ui/PatientHeader";
import Panel from "../components/ui/Panel";
import PanelTitle from "../components/ui/PanelTitle";
import Filter from "../components/ui/Filter";
import Button from "../components/ui/Button";
import NoteItem from "../components/ui/NoteItem";
import Icon from "../components/ui/Icon";
import { blockColors as colors } from "../utils/colors";
import add from "../assets/icons/add.svg";
import control from "../assets/icons/control.svg";
import calendar from "../assets/icons/calendar.svg";
import person from "../assets/icons/person.svg";
import switchIcon from "../assets/icons/switch.svg";
import back from "../assets/icons/back.svg";
import next from "../assets/icons/next.svg";
import game from "../assets/icons/game.svg";

const gameBlockColorKeys = ["purple", "green", "yellow", "red", "gray"];

export default function TherapistNotes() {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    gameId: "",
    period: "",
    therapistName: "",
  });
  const [now] = useState(() => Date.now());
  const [newestFirst, setNewestFirst] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { findPatient, findNotesByPatient } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);
  const noteColors = colors();
  const patient = findPatient(id);
  const patientNotes = findNotesByPatient(id);
  const gameOptions = [
    ...new Set(patientNotes.map((note) => note.gameId)),
  ].map((gameId) => ({
    id: gameId,
    name: findGame(gameId)?.name ?? `Jogo ${Number(gameId) + 1}`,
  }));
  const therapistOptions = [
    ...new Set(patientNotes.map((note) => note.therapistName)),
  ];
  const filteredNotes = patientNotes.filter((note) => {
    const matchesGame =
      !filters.gameId || String(note.gameId) === filters.gameId;
    const matchesTherapist =
      !filters.therapistName || note.therapistName === filters.therapistName;
    const days = Number(filters.period);
    const matchesPeriod =
      !filters.period ||
      note.dateTime >= new Date(now - days * 24 * 60 * 60 * 1000);

    return matchesGame && matchesTherapist && matchesPeriod;
  });
  const noteCount = filteredNotes.length;
  const sortedNotes = [...filteredNotes].sort((first, second) =>
    newestFirst
      ? second.dateTime - first.dateTime
      : first.dateTime - second.dateTime,
  );
  const pageSize = 4;
  const pageCount = Math.ceil(sortedNotes.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const firstNoteIndex = (activePage - 1) * pageSize;
  const visibleNotes = sortedNotes.slice(firstNoteIndex, firstNoteIndex + pageSize);
  const firstVisibleNote = noteCount === 0 ? 0 : firstNoteIndex + 1;
  const lastVisibleNote = Math.min(firstNoteIndex + pageSize, noteCount);

  function updateFilter(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
    setCurrentPage(1);
  }

  function clearFilters() {
    setFilters({ gameId: "", period: "", therapistName: "" });
    setCurrentPage(1);
  }

  function toggleSortOrder() {
    setNewestFirst((current) => !current);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <PatientHeader
        title="Notas do terapeuta"
        description={`Consulte o histórico clínico de ${patient.getName()} e o contexto de cada jogo terapêutico`}
        backLinkTitle="Voltar à ficha do paciente"
        backLinkPath={`/app/patients/${id}`}
        button={{
          text: "Nova anotação",
          icon: add
        }}
        patient={patient}
      />
      <section className="flex justify-between items-end w-full">
        <div className="flex gap-4">
          <Filter
            className="md:min-w-40"
            label="JOGO"
            icon={control}
            value={filters.gameId}
            onChange={(event) => updateFilter("gameId", event.target.value)}
          >
            <option value="">Todos os jogos</option>
            {gameOptions.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </Filter>
          <Filter
            className="lg:min-w-40"
            label="PERÍODO"
            icon={calendar}
            value={filters.period}
            onChange={(event) => updateFilter("period", event.target.value)}
          >
            <option value="">Todo o período</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </Filter>
          <Filter
            className="lg:min-w-40"
            label="RESPONSÁVEL"
            icon={person}
            value={filters.therapistName}
            onChange={(event) =>
              updateFilter("therapistName", event.target.value)
            }
          >
            <option value="">Todos</option>
            {therapistOptions.map((therapistName) => (
              <option key={therapistName} value={therapistName}>
                {therapistName}
              </option>
            ))}
          </Filter>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-(--secondary) text-xs">
            {noteCount} {noteCount === 1 ? "anotação encontrada" : "anotações encontradas"}
          </span>
          <button
            className="text-(--button) text-sm font-semibold hover:underline active:no-underline px-3"
            onClick={clearFilters}
          >
            Limpar filtros
          </button>
        </div>
      </section>
      <section className="flex gap-5 w-full h-full">
        <Panel className="flex flex-col justify-between">
          <div className="flex flex-col h-full overflow-y-scroll">
            <div className="flex justify-between border-b border-(--border) px-5 py-4">
              <PanelTitle>Anotações do paciente</PanelTitle>
              <button
                className="inline-flex gap-1.5 rounded-lg px-2.5 py-1.75 outline-0 bg-(--background) transition-colors duration-150 hover:bg-(--border) active:bg-(--background)"
                onClick={toggleSortOrder}
              >
                <Icon src={switchIcon} size={13} color="var(--secondary)" />
                <span className="text-[11px] text-(--secondary) font-semibold">
                  {newestFirst ? "Mais recentes" : "Mais antigas"}
                </span>
              </button>
            </div>
            {visibleNotes.map((note) => {
              const colorKey =
                gameBlockColorKeys[note.gameId % gameBlockColorKeys.length] ??
                "gray";

              return (
                <NoteItem
                  key={note.id}
                  noteText={note.content}
                  gameTitle={findGame(note.gameId)?.name ?? `Jogo ${Number(note.gameId) + 1}`}
                  gameIcon={game}
                  gameColors={noteColors[colorKey]}
                  date={note.dateTime}
                  therapist={note.therapistName}
                />
              );
            })}
          </div>
          <div className="flex justify-between items-center px-4 py-2.5 bg-(--background) w-full">
            <span className="text-[11px] text-(--secondary)">
              Mostrando {firstVisibleNote}–{lastVisibleNote} de {noteCount} anotações
            </span>
            <div className="flex gap-1.5">
              <Button
                size="square"
                icon={back}
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={activePage <= 1}
              />
              <span className="flex w-8 h-8 shrink-0 justify-center items-center bg-(--button) rounded-lg text-xs text-white font-bold">
                {activePage}
              </span>
              <Button
                size="square"
                icon={next}
                onClick={() => setCurrentPage((page) => Math.min(page + 1, pageCount))}
                disabled={activePage >= pageCount}
              />
            </div>
          </div>
        </Panel>
      </section>
    </div>
  )
}