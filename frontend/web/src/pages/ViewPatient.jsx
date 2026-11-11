import { useContext, useState } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import { TherapistContext } from "../context/TherapistContext";
import PatientHeader from "../components/ui/PatientHeader";
import Subtitle from "../components/ui/Subtitle";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import PanelTitle from "../components/ui/PanelTitle";
import PanelSubtitle from "../components/ui/PanelSubtitle";
import Topic from "../components/ui/Topic";
import Filter from "../components/ui/Filter";
import CardItem from "../components/ui/CardItem";
import TextCard from "../components/ui/TextCard";
import SessionDetails from "../components/ui/SessionDetails";
import SessionItem from "../components/ui/SessionItem";
import SessionListControls, {
  SessionPageSizeSelect,
} from "../components/ui/SessionListControls";
import TextArea from "../components/ui/TextArea";
import Icon from "../components/ui/Icon";
import DataRow from "../components/ui/DataRow";
import GameCard from "../components/ui/GameCard";
import { blockColors } from "../utils/colors";
import { translateSetting } from "../utils/settings";
import { formatDateTime } from "../utils/formatDates";
import { findNoteForSession } from "../utils/sessionNotes";
import add from "../assets/icons/add.svg";
import control from "../assets/icons/control.svg";
import patientData from "../assets/icons/patientData.svg";
import patientSettings from "../assets/icons/patientSettings.svg";
import calendar from "../assets/icons/calendar.svg";
import back from "../assets/icons/back.svg";
import next from "../assets/icons/next.svg";
import gameIcon from "../assets/icons/game.svg";
import remove from "../assets/icons/remove.svg";
import time from "../assets/icons/time.svg";
import difficulty from "../assets/icons/difficulty.svg";
import person from "../assets/icons/person.svg";
import focus from "../assets/icons/focus.svg";
import chartBar from "../assets/icons/chartBar.svg";
import lamp from "../assets/icons/lamp.svg";
import pen from "../assets/icons/pen.svg";
import check from "../assets/icons/check.svg";

const gameBlockColorKeys = ["purple", "green", "yellow", "red", "gray"];
export default function ViewPatient() {
  const formatter = new Intl.DateTimeFormat("pt-BR");
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedGameId = searchParams.get("game") ?? "";
  const requestedSessionId = searchParams.get("session");
  const {
    findPatient,
    addTherapistNote,
    editTherapistNote,
  } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);
  const { therapist } = useContext(TherapistContext);
  const patient = findPatient(id);
  const [filters, setFilters] = useState({
    gameId: requestedGameId,
    period: "",
    therapistName: "",
  });
  const [now] = useState(() => Date.now());
  const [newestFirst, setNewestFirst] = useState(true);
  const [noteFilter, setNoteFilter] = useState("all");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSessionKey, setSelectedSessionKey] = useState(() =>
    requestedGameId && requestedSessionId
      ? `${requestedGameId}:${requestedSessionId}`
      : null,
  );
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [nextConduct, setNextConduct] = useState("");
  const colors = blockColors();

  if (!patient) {
    return null;
  }

  const patientGames = (patient.games ?? [])
    .map((association) => ({
      ...association,
      game: findGame(association.gameId),
    }))
    .filter(({ game }) => Boolean(game));
  const patientSessions = (patient.games ?? []).flatMap((patientGame) =>
    (patientGame.sessions ?? []).map((session, index) => {
      const gameId = patientGame.gameId;
      const sessionKey = `${gameId}:${session.id ?? index}`;

      return {
        key: sessionKey,
        gameId,
        session,
        patientGame,
        game: findGame(gameId),
        note: findNoteForSession(patientGame.notes ?? [], session),
      };
    }),
  );
  const therapistOptions = [
    ...new Set(
      patientSessions
        .map(({ note }) => note?.therapistName)
        .filter(Boolean),
    ),
  ];
  const filteredSessions = patientSessions
    .filter(({ gameId, session, note }) => {
      const matchesGame =
        !filters.gameId || String(gameId) === String(filters.gameId);
      const days = Number(filters.period);
      const cutoffDate = new Date(now - days * 24 * 60 * 60 * 1000);
      const matchesPeriod =
        !filters.period || new Date(session.dateTime) >= cutoffDate;
      const matchesTherapist =
        !filters.therapistName ||
        note?.therapistName === filters.therapistName;
      const matchesNoteFilter =
        noteFilter === "all" ||
        (noteFilter === "with-note" && Boolean(note)) ||
        (noteFilter === "without-note" && !note);

      return (
        matchesGame &&
        matchesPeriod &&
        matchesTherapist &&
        matchesNoteFilter
      );
    })
    .sort((first, second) => {
      const dateDifference =
        new Date(second.session.dateTime).getTime() -
        new Date(first.session.dateTime).getTime();

      return newestFirst ? dateDifference : -dateDifference;
    });
  const sessionCount = filteredSessions.length;
  const pageCount = Math.ceil(sessionCount / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount, 1));
  const firstSessionIndex = (activePage - 1) * pageSize;
  const visibleSessions = filteredSessions.slice(
    firstSessionIndex,
    firstSessionIndex + pageSize,
  );
  const firstVisibleSession = sessionCount === 0 ? 0 : firstSessionIndex + 1;
  const lastVisibleSession = Math.min(
    firstSessionIndex + pageSize,
    sessionCount,
  );
  const selectedSessionRecord =
    patientSessions.find(({ key }) => key === selectedSessionKey) ?? null;
  const selectedNote = selectedSessionRecord?.note;
  const selectedGame = selectedSessionRecord?.game;
  const selectedPatientGame = selectedSessionRecord?.patientGame;

  function openSessionHistory() {
    navigate(
      `/app/patients/games/history?patient=${id}&game=${selectedSessionRecord.gameId}&session=${selectedSessionRecord.session.id}#session-performance`,
    );
  }

  function startNoteEditing() {
    setNoteContent(selectedNote?.content ?? "");
    setNextConduct(selectedNote?.nextConduct ?? "");
    setIsEditingNote(true);
  }

  function cancelNoteEditing() {
    setIsEditingNote(false);
    setNoteContent("");
    setNextConduct("");
  }

  function hasNoteChanges() {
    return (
      noteContent.trim() !== (selectedNote?.content ?? "").trim() ||
      nextConduct.trim() !== (selectedNote?.nextConduct ?? "").trim()
    );
  }

  async function requestCancelNoteEditing() {
    if (!hasNoteChanges()) {
      cancelNoteEditing();
      return true;
    }

    const result = await Swal.fire({
      title: "Descartar alterações?",
      text: "As alterações ainda não salvas serão perdidas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Descartar alterações",
      confirmButtonColor: "var(--button)",
      cancelButtonText: "Continuar editando",
      reverseButtons: true,
      background: "var(--panel)",
      color: "var(--text)",
      customClass: {
        popup: "swal2-app-popup",
        title: "swal2-app-title",
        confirmButton: "swal2-app-confirm",
        cancelButton: "swal2-app-cancel",
      },
    });

    if (!result.isConfirmed) {
      return false;
    }

    cancelNoteEditing();
    return true;
  }

  async function saveNote() {
    if (!hasNoteChanges()) {
      cancelNoteEditing();
      return;
    }

    const content = noteContent.trim();

    if (!content) {
      await Swal.fire({
        title: "Preencha a observação clínica.",
        background: "var(--panel)",
        color: "var(--text)",
        confirmButtonColor: "var(--button)",
      });
      return;
    }

    const result = await Swal.fire({
      title: selectedNote ? "Salvar alterações?" : "Salvar anotação?",
      text: selectedNote
        ? "Confirma as alterações desta anotação?"
        : "Confirma o registro desta anotação para a sessão?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: selectedNote ? "Salvar alterações" : "Salvar anotação",
      confirmButtonColor: "var(--button)",
      cancelButtonText: "Continuar editando",
      reverseButtons: true,
      background: "var(--panel)",
      color: "var(--text)",
      customClass: {
        popup: "swal2-app-popup",
        title: "swal2-app-title",
        confirmButton: "swal2-app-confirm",
        cancelButton: "swal2-app-cancel",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    if (selectedNote) {
      editTherapistNote({
        patientId: id,
        noteId: selectedNote.id,
        content,
        nextConduct: nextConduct.trim(),
      });
    } else {
      const saved = addTherapistNote({
        patientId: id,
        gameId: selectedSessionRecord.gameId,
        therapistName: therapist.name,
        content,
        nextConduct: nextConduct.trim(),
        dateTime: selectedSessionRecord.session.dateTime,
        sessionId: selectedSessionRecord.session.id,
      });

      if (!saved) {
        await Swal.fire({
          title: "Esta sessão já possui uma anotação.",
          background: "var(--panel)",
          color: "var(--text)",
          confirmButtonColor: "var(--button)",
        });
        return;
      }
    }

    cancelNoteEditing();
    Swal.fire({
      title: selectedNote
        ? "Anotação atualizada com sucesso!"
        : "Anotação salva com sucesso!",
      icon: "success",
      background: "var(--panel)",
      color: "var(--text)",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
  }

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
    <section className="flex flex-col items-start gap-5">
      <PatientHeader
        title="Ficha do paciente"
        description="Acompanhe sessões realizadas, anotações clínicas, dados cadastrais e jogos terapêuticos ativos"
        backLinkPath="/app/patients"
        patient={patient}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full">
        <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
          <PanelTitle small icon={control}>
            Jogos atribuídos
          </PanelTitle>
          <div className="flex flex-col gap-4 px-2 w-full max-h-75 overflow-y-scroll">
            {patientGames.length === 0 ? (
              <p className="text-(--secondary) text-[13px]">
                O paciente não tem nenhum jogo
              </p>
            ) : (
              patientGames.map(({ game, gameId, difficulty, movementFocuses }) => (
                <GameCard
                  key={gameId}
                  compact
                  toolButtons={true}
                  color={game.color}
                  name={game.name}
                  category={game.category}
                  skill={game.skill}
                  difficulty={difficulty}
                  movementFocuses={movementFocuses}
                  gameId={gameId}
                  patientId={id}
                  onClick={() =>
                    navigate(
                      `/app/patients/games/history?patient=${patient.id}&game=${gameId}`,
                    )
                  }
                />
              ))
            )}
          </div>
          <hr />
          <Link
            to={`/app/patients/games/${id}`}
            className="text-(--link) text-sm hover:underline font-semibold"
          >
            Editar jogos atribuídos
          </Link>
        </Panel>
        <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
          <PanelTitle small icon={patientData}>
            Dados do paciente
          </PanelTitle>
          <div className="flex flex-col gap-3 w-full">
            <DataRow title="Prontuário" value={patient.id} />
            <DataRow title="Nome completo" value={patient.name} />
            <DataRow
              title="Data de nascimento"
              value={formatter.format(patient.birthDate)}
            />
            <DataRow title="Idade" value={`${patient.getAge()} anos`} />
            <DataRow title="Diagnóstico" value={patient.diagnosis} />
          </div>
        </Panel>
        <Panel className="flex flex-col items-start gap-4 px-6 py-5 w-full">
          <PanelTitle small icon={patientSettings}>
            Configurações do Paciente
          </PanelTitle>
          <div className="flex flex-col gap-3 w-full">
            <DataRow
              title="Tema da tela"
              value={translateSetting("theme", patient.theme)}
            />
            <DataRow
              title="Tamanho dos itens"
              value={translateSetting("style", patient.style)}
            />
            <DataRow
              title="Tipo de estilo"
              value={translateSetting("itemsSize", patient.itemsSize)}
            />
            <DataRow
              title="Alto contraste"
              value={translateSetting("contrast", patient.contrast)}
            />
            <DataRow
              title="Usar símbolos"
              value={translateSetting("useSymbols", patient.useSymbols)}
            />
            <DataRow
              title="Efeitos sonoros dos jogos"
              value={translateSetting("soundEffects", patient.soundEffects)}
            />
            <DataRow
              title="Orientações por voz"
              value={translateSetting(
                "voiceInstructions",
                patient.voiceInstructions,
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              className="w-full"
              type="edit"
              size="small"
              onClick={() => navigate(`/app/patients/settings/${id}`)}
            >
              Editar Configurações
            </Button>
          </div>
        </Panel>
      </div>
      <section className="flex flex-col gap-4 w-full">
        <Subtitle>Sessões do paciente</Subtitle>
        <section className="flex flex-wrap justify-between items-end gap-4 w-full">
          <div className="flex flex-wrap gap-4">
            <Filter
              className="md:min-w-40"
              label="JOGO"
              icon={control}
              value={filters.gameId}
              onChange={(event) => updateFilter("gameId", event.target.value)}
            >
              <option value="">Todos os jogos</option>
              {patientGames.map(({ gameId, game }) => (
                <option key={gameId} value={gameId}>
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
              {sessionCount}{" "}
              {sessionCount === 1
                ? "sessão encontrada"
                : "sessões encontradas"}
            </span>
            <button
              className="text-(--button) text-sm font-semibold hover:underline active:no-underline px-3"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          </div>
        </section>
        <section
          className={`grid gap-5 w-full transition-[grid-template-columns] duration-300 ease-in-out ${
            selectedSessionRecord
              ? "grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
              : "grid-cols-1"
          }`}
        >
          <Panel className="flex h-136 min-w-0 flex-col justify-between">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll">
              <div className="flex flex-wrap justify-between items-center gap-3 border-b border-(--border) px-5 py-4">
                <PanelTitle small>Sessões jogadas</PanelTitle>
                <SessionListControls
                  newestFirst={newestFirst}
                  onToggleSort={toggleSortOrder}
                  noteFilter={noteFilter}
                  onNoteFilterChange={(value) => {
                    setNoteFilter(value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              {visibleSessions.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-(--secondary)">
                  {patientSessions.length === 0
                    ? "O paciente ainda não jogou nenhuma sessão."
                    : "Nenhuma sessão encontrada com esses filtros."}
                </p>
              ) : (
                visibleSessions.map((record) => {
                  const colorKey =
                    gameBlockColorKeys[
                      Number(record.gameId) % gameBlockColorKeys.length
                    ] ?? "gray";
                  const isSelected = selectedSessionKey === record.key;

                  return (
                    <SessionItem
                      key={record.key}
                      gameTitle={
                        record.game?.name ??
                        `Jogo ${Number(record.gameId) + 1}`
                      }
                      gameIcon={gameIcon}
                      gameColors={colors[colorKey]}
                      noteColors={record.note ? colors.green : colors.gray}
                      date={record.session.dateTime}
                      noteText={
                        record.note?.content ??
                        "Esta sessão ainda não tem anotação clínica."
                      }
                      therapist={record.note?.therapistName}
                      hasNote={Boolean(record.note)}
                      isSelected={isSelected}
                      onClick={async () => {
                        if (record.key === selectedSessionKey) {
                          return;
                        }
                        if (
                          isEditingNote &&
                          !(await requestCancelNoteEditing())
                        ) {
                          return;
                        }
                        setSelectedSessionKey(record.key);
                      }}
                    />
                  );
                })
              )}
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 bg-(--background) w-full">
              <div className="flex flex-wrap items-center gap-2">
                <SessionPageSizeSelect
                  value={pageSize}
                  onChange={(value) => {
                    setPageSize(value);
                    setCurrentPage(1);
                  }}
                />
                <span className="text-[11px] text-(--secondary)">
                  Mostrando {firstVisibleSession}–{lastVisibleSession} de{" "}
                  {sessionCount} sessões
                </span>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="square"
                  icon={back}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={activePage <= 1}
                />
                <span className="flex w-8 h-8 shrink-0 justify-center items-center bg-(--button) rounded-lg text-xs text-white font-bold">
                  {activePage}
                </span>
                <Button
                  size="square"
                  icon={next}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, pageCount))
                  }
                  disabled={activePage >= pageCount}
                />
              </div>
            </div>
          </Panel>
          {selectedSessionRecord && (
            <Panel className="flex flex-col gap-4 p-5 min-w-0">
              <section className="flex justify-between gap-2 w-full">
                <div className="flex flex-col gap-1.75">
                  <PanelTitle small>Detalhes da sessão</PanelTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardItem
                      compact
                      colors={
                        colors[
                          gameBlockColorKeys[
                            Number(selectedSessionRecord.gameId) %
                              gameBlockColorKeys.length
                          ] ?? "gray"
                        ]
                      }
                      icon={gameIcon}
                    >
                      {selectedGame?.name ??
                        `Jogo ${Number(selectedSessionRecord.gameId) + 1}`}
                    </CardItem>
                    <span className="text-xs text-(--item)">•</span>
                    <span className="text-xs text-(--text) font-semibold">
                      {formatDateTime(
                        selectedSessionRecord.session.dateTime,
                        " às ",
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  size="square"
                  icon={remove}
                  className="self-start shrink-0"
                  onClick={async () => {
                    if (
                      isEditingNote &&
                      !(await requestCancelNoteEditing())
                    ) {
                      return;
                    }
                    setSelectedSessionKey(null);
                  }}
                />
              </section>
              <hr />
              <section className="flex flex-col gap-3 w-full">
                <PanelSubtitle small>Especificações da sessão</PanelSubtitle>
                <div className="grid grid-cols-2 gap-3">
                  <SessionDetails
                    title="DURAÇÃO"
                    value={`${selectedSessionRecord.session.duration} minutos`}
                    icon={time}
                  />
                  <SessionDetails
                    title="DIFICULDADE"
                    value={selectedPatientGame?.difficulty ?? "—"}
                    icon={difficulty}
                  />
                  <SessionDetails
                    title="PONTUAÇÃO"
                    value={
                      Number.isFinite(selectedSessionRecord.session.score)
                        ? selectedSessionRecord.session.score.toLocaleString(
                            "pt-BR",
                          )
                        : "—"
                    }
                    icon={control}
                  />
                  <SessionDetails
                    title="FOCO TERAPÊUTICO"
                    value={selectedGame?.skill ?? "—"}
                    icon={focus}
                  />
                </div>
              </section>
              <hr />
              <section className="flex gap-2 w-full">
                <TextCard
                  title="RESPOSTA"
                  text={selectedSessionRecord.session.evolutionLevel ?? "—"}
                  colors={{
                    Baixa: "red",
                    Média: "yellow",
                    Alta: "green",
                  }[selectedSessionRecord.session.evolutionLevel]}
                />
                <TextCard
                  title="SUPORTE"
                  text={selectedSessionRecord.session.supportLevel ?? "—"}
                  colors="gray"
                />
              </section>
              {isEditingNote ? (
                <section className="flex flex-col gap-4 w-full">
                  <TextArea
                    label="Observação clínica"
                    placeholder="Descreva a participação, os avanços e as dificuldades observadas durante a atividade."
                    value={noteContent}
                    onChange={(event) => setNoteContent(event.target.value)}
                  />
                  <TextArea
                    label="Próxima conduta"
                    placeholder="Indique os objetivos e os ajustes para a próxima sessão."
                    value={nextConduct}
                    onChange={(event) => setNextConduct(event.target.value)}
                  />
                  <div className="flex justify-end gap-2 w-full">
                    <Button onClick={requestCancelNoteEditing}>Cancelar</Button>
                    <Button
                      type="primary"
                      icon={check}
                      onClick={saveNote}
                    >
                      Confirmar
                    </Button>
                  </div>
                </section>
              ) : (
                <>
                  {selectedNote?.content?.trim() && (
                    <section className="flex flex-col gap-2 w-full">
                      <Topic>OBSERVAÇÃO CLÍNICA</Topic>
                      <p className="text-sm text-(--text) text-justify">
                        {selectedNote.content}
                      </p>
                    </section>
                  )}
                  {selectedNote?.nextConduct?.trim() && (
                    <section
                      className="flex gap-2.5 rounded-lg p-3"
                      style={{
                        backgroundColor: colors.yellow.background,
                      }}
                    >
                      <Icon
                        src={lamp}
                        color={colors.yellow.text}
                        size={10}
                        className="mt-1"
                      />
                      <div className="flex flex-col gap-3/4">
                        <h5
                          className="text-[11px] font-bold"
                          style={{ color: colors.yellow.text }}
                        >
                          PRÓXIMA CONDUTA
                        </h5>
                        <p className="text-(--text) text-xs">
                          {selectedNote.nextConduct}
                        </p>
                      </div>
                    </section>
                  )}
                  {!selectedNote && (
                    <p className="text-sm text-(--secondary)">
                      Ainda não há anotação clínica para esta sessão.
                    </p>
                  )}
                  <section className="flex flex-wrap justify-between items-center gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <Button
                        type="edit"
                        size="small"
                        icon={chartBar}
                        onClick={openSessionHistory}
                      >
                        Ver detalhes da sessão
                      </Button>
                      {selectedNote?.therapistName && (
                        <span className="text-[11px] text-(--secondary)">
                          Registrado por {selectedNote.therapistName}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {selectedNote ? (
                        <Button
                          type="edit"
                          size="small"
                          icon={pen}
                          onClick={startNoteEditing}
                        >
                          Editar anotação
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          size="small"
                          icon={add}
                          onClick={startNoteEditing}
                        >
                          Adicionar anotação
                        </Button>
                      )}
                    </div>
                  </section>
                </>
              )}
            </Panel>
          )}
        </section>
      </section>
    </section>
  );
}
