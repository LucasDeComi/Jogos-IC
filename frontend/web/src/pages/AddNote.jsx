import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { TherapistContext } from "../context/TherapistContext";
import { GameContext } from "../context/GameContext";
import { cardColors, profileColors } from "../utils/colors";
import { formatDateTime } from "../utils/formatDates";
import PatientHeader from "../components/ui/PatientHeader";
import Panel from "../components/ui/Panel";
import PanelHeader from "../components/ui/PanelHeader";
import PanelTitle from "../components/ui/PanelTitle";
import Label from "../components/ui/Label";
import Radio from "../components/ui/Radio";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import GameSessionCard from "../components/ui/GameSessionCard";
import SessionDetails from "../components/ui/SessionDetails";
import sessionIcon from "../assets/icons/control.svg";
import gameIcon from "../assets/icons/game.svg";
import clinicalRegister from "../assets/icons/clinical-register.svg";
import check from "../assets/icons/check.svg";
import lock from "../assets/icons/lock.svg";
import time from "../assets/icons/time.svg";
import difficulty from "../assets/icons/difficulty.svg";
import conclusion from "../assets/icons/conclusion.svg";
import focus from "../assets/icons/focus.svg";
import info from "../assets/icons/info.svg";

export default function AddNote() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [content, setContent] = useState("");
  const [nextConduct, setNextConduct] = useState("");
  const { findPatient, addTherapistNote } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);
  const { therapist } = useContext(TherapistContext);

  const patient = patientId ? findPatient(patientId) ?? null : null;
  const patientGames = (patient?.games ?? []).map(
    ({ gameId: patientGameId, difficulty, notes = [] }, index) => ({
      id: patientGameId,
      name:
        findGame(patientGameId)?.name ?? `Jogo ${Number(patientGameId) + 1}`,
      color: profileColors[index % profileColors.length],
      difficulty,
      sessions: notes,
    }),
  );
  const selectedGame = patientGames.find(
    ({ id }) => id === selectedGameId,
  );
  const hasSelectedSession = Boolean(selectedSession && selectedGame);

  function saveNote() {
    if (
      selectedGameId === null ||
      !selectedSession ||
      !content.trim()
    ) {
      Swal.fire({
        title: "Selecione um jogo e uma sessão e preencha a observação clínica.",
        background: "var(--panel)",
        color: "var(--text)",
        confirmButtonColor: "var(--button)",
      });
      return;
    }

    addTherapistNote({
      patientId,
      gameId: selectedGameId,
      therapistName: therapist.name,
      content: content.trim(),
      nextConduct: nextConduct.trim(),
    });

    navigate(`/app/patients/notes/${patientId}`);
    Swal.fire({
      title: "Anotação salva com sucesso!",
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

  async function cancelNote() {
    const hasSelectedGameOrSession =
      selectedGameId !== null || Boolean(selectedSession);
    const hasWrittenContent = Boolean(content.trim() || nextConduct.trim());

    if (!hasSelectedGameOrSession && !hasWrittenContent) {
      navigate(`/app/patients/notes/${patientId}`);
      return;
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

    if (result.isConfirmed) {
      navigate(`/app/patients/notes/${patientId}`);
    }
  }

  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <PatientHeader
        title="Adicionar anotação"
        description={`Selecione uma sessão de ${patient.getName()} e registre suas observações clínicas.`}
        backLinkTitle="Voltar às notas do terapeuta"
        backLinkPath={`/app/patients/notes/${patientId}`}
        patient={patient}
      />
      <section
        className={`grid ${hasSelectedSession ? "grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "grid-cols-1"} gap-5 w-full`}
      >
        <Panel className="flex flex-col">
          <div className="flex flex-col gap-4.5 p-6">
            <PanelHeader
              title="Vincular sessão"
              subtitle="Selecione o jogo e, em seguida, uma sessão já realizada."
              icon={sessionIcon}
            />
            <div className="flex flex-col gap-2">
              <Label>Jogo</Label>
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Jogo">
                {patientGames.map(({ id, name, color }) => (
                  <Radio
                    key={id}
                    title={name}
                    icon={gameIcon}
                    iconColor={color}
                    checked={selectedGameId === id}
                    onClick={() => {
                      setSelectedGameId(id);
                      setSelectedSession(null);
                    }}
                  />
                ))}
              </div>
            </div>
            {selectedGame && (
              <div className="flex flex-col gap-2">
                <Label>Sessão jogada</Label>
                <span className="text-xs text-(--secondary)">
                  Sessões de {selectedGame.name} realizadas por {patient.getName()}. Selecione uma.
                </span>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="radiogroup"
                  aria-label="Sessão jogada"
                >
                  {selectedGame.sessions.length > 0 ? (
                    selectedGame.sessions.map((session, index) => (
                      <Radio
                        key={session.id ?? index}
                        title={formatDateTime(session.dateTime, " às ")}
                        checked={selectedSession === session}
                        onClick={() => setSelectedSession(session)}
                        indicatorPosition="left"
                      />
                    ))
                  ) : (
                    <span className="text-xs text-(--secondary)">
                      Não há sessões registradas para este jogo.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="flex flex-col gap-4.5 p-6">
            <PanelHeader
              title="Registro clínico"
              subtitle="Preencha os campos com a sua avaliação da sessão."
              icon={clinicalRegister}
            />
            <TextArea
              label="Observação clínica"
              placeholder="Descreva a participação, os avanços e as dificuldades observadas durante a atividade."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <TextArea
              label="Próxima conduta"
              placeholder="Indique os objetivos e os ajustes para a próxima sessão."
              value={nextConduct}
              onChange={(event) => setNextConduct(event.target.value)}
            />
          </div>
          <hr />
          <div className="flex justify-between items-center px-6 py-4.5">
            <span className="text-xs text-(--secondary)">Responsável: {therapist.name}</span>
            <div className="flex gap-2.5">
              <Button onClick={cancelNote}>Cancelar</Button>
              <Button type="primary" icon={check} onClick={saveNote}>
                Salvar anotação
              </Button>
            </div>
          </div>
        </Panel>
        {hasSelectedSession && (
          <div className="flex flex-col gap-4">
            <Panel className="flex flex-col gap-5 p-6">
              <section className="flex flex-col gap-2">
                <PanelTitle small>Especificações da Sessão</PanelTitle>
                <div className="flex items-center gap-1.25">
                  <Icon src={lock} color="var(--secondary)" size={12} />
                  <span className="text-[11px] text-(--secondary)">Somente leitura</span>
                </div>
              </section>
              <GameSessionCard
                colors={cardColors().green}
                icon={gameIcon}
                title={selectedGame.name}
                date={selectedSession.dateTime}
                patient={patient}
              />
              <section className="grid grid-cols-2 gap-3">
                <SessionDetails
                  title="DURAÇÃO"
                  value="22 minutos"
                  icon={time}
                />
                <SessionDetails
                  title="DIFICULDADE"
                  value={selectedGame.difficulty}
                  icon={difficulty}
                />
                <SessionDetails
                  title="CONCLUSÃO"
                  value="3 de 3 tentativas"
                  icon={conclusion}
                />
                <SessionDetails
                  title="FOCO TERAPÊUTICO"
                  value="Coordenação"
                  icon={focus}
                />
              </section>
              <hr />
              <span className="text-xs text-(--secondary) text-justify">Dados da sessão jogada. Estas informações não são alteradas pela anotação.</span>
            </Panel>
            <div className="flex gap-2.5 p-4.5 rounded-lg bg-(--transparent)">
              <Icon src={info} color="var(--link)" size={17} />
              <div className="flex flex-col gap-1.25">
                <h5 className="text-[13px] text-(--primary) font-semibold">Uma sessão por anotação</h5>
                <span className="text-xs text-(--primary)">Escolha primeiro o jogo. Depois, selecione uma sessão já jogada por este paciente nesse jogo.</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}