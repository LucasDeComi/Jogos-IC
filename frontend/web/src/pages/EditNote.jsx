import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { TherapistContext } from "../context/TherapistContext";
import { GameContext } from "../context/GameContext";
import { cardColors } from "../utils/colors";
import { formatDateTime } from "../utils/formatDates"
import PatientHeader from "../components/ui/PatientHeader";
import Panel from "../components/ui/Panel";
import PanelHeader from "../components/ui/PanelHeader";
import PanelTitle from "../components/ui/PanelTitle";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import GameSessionCard from "../components/ui/GameSessionCard";
import SessionDetails from "../components/ui/SessionDetails";
import SessionData from "../components/ui/SessionData";
import clinicalRegister from "../assets/icons/clinical-register.svg";
import check from "../assets/icons/check.svg";
import gameIcon from "../assets/icons/game.svg";
import lock from "../assets/icons/lock.svg";
import time from "../assets/icons/time.svg";
import difficulty from "../assets/icons/difficulty.svg";
import conclusion from "../assets/icons/conclusion.svg";
import focus from "../assets/icons/focus.svg";
import clock from "../assets/icons/clock.svg";

export default function EditNote() {
  const { id: noteId } = useParams();
  const { findPatient, findTherapistNote } = useContext(PatientContext);
  const note = findTherapistNote(noteId);
  const patient = note ? findPatient(note.patientId) : null;

  if (!note || !patient) {
    return <Navigate to="/app/patients" replace />;
  }

  return <EditNoteForm key={note.id} note={note} patient={patient} />;
}

function EditNoteForm({ note, patient }) {
  const navigate = useNavigate();
  const { editTherapistNote } = useContext(PatientContext);
  const { therapist } = useContext(TherapistContext);
  const { findGame } = useContext(GameContext);
  const noteGame = patient.games?.find((game) => game.gameId === note.gameId);
  const game = findGame(note.gameId);
  const gameName = game?.name ?? `Jogo ${Number(note.gameId) + 1}`;
  const gameCardColors = cardColors().green;
  const [content, setContent] = useState(note?.content ?? "");
  const [nextConduct, setNextConduct] = useState(note?.nextConduct ?? "");

  async function saveNote() {
    const updatedContent = content.trim();
    const updatedNextConduct = nextConduct.trim();
    const hasChanges =
      updatedContent !== (note.content ?? "").trim() ||
      updatedNextConduct !== (note.nextConduct ?? "").trim();

    if (!hasChanges) {
      navigate(`/app/patients/notes/${note.patientId}`);
      return;
    }

    if (!updatedContent) {
      Swal.fire({
        title: "Preencha a observação clínica.",
        background: "var(--panel)",
        color: "var(--text)",
        confirmButtonColor: "var(--button)",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Salvar alterações?",
      text: "Confirma o salvamento das alterações desta anotação?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Salvar alterações",
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

    editTherapistNote({
      patientId: note.patientId,
      noteId: note.id,
      content: updatedContent,
      nextConduct: updatedNextConduct,
    });

    navigate(`/app/patients/notes/${note.patientId}`);
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
    const hasWrittenContent = Boolean(
      content !== note.content ||
        nextConduct !== (note.nextConduct ?? ""),
    );

    if (!hasWrittenContent) {
      navigate(`/app/patients/notes/${note.patientId}`);
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
      navigate(`/app/patients/notes/${note.patientId}`);
    }
  }

  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <PatientHeader
        title="Editar anotação"
        description={`Atualize o registro clínico de ${patient.getName()}. O vínculo com a sessão será preservado.`}
        backLinkTitle="Voltar às notas do terapeuta"
        backLinkPath={`/app/patients/notes/${note.patientId}`}
        patient={patient}
      />
      <section className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 w-full">
        <Panel className="flex flex-col">
          <div className="flex flex-col gap-4.5 p-6">
            <PanelHeader
              title="Sessão vinculada"
              subtitle="Os dados de identificação da sessão são somente leitura."
              icon={lock}
            />
            <div className="flex flex-col gap-4 rounded-lg p-4.5 bg-(--transparent)">
              <div className="grid grid-cols-2">
                <SessionData
                  title="JOGO"
                  text={gameName}
                  icon={gameIcon}
                  textColor="var(--primary)"
                  iconColor="var(--link)"
                />
                <SessionData
                  title="SESSÃO · DATA E HORA"
                  text={formatDateTime(note.dateTime, " às ")}
                  icon={clock}
                />
              </div>
              <hr className="border-(--hr)!" />
              <div className="flex items-center gap-1.75">
                <Icon src={lock} size={12} color="var(--secondary)" />
                <span className="text-xs text-(--secondary)">Jogo, sessão, data e hora não podem ser alterados.</span>
              </div>
            </div>
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
            <span className="text-xs text-(--secondary)">
              Responsável: {therapist.name}
            </span>
            <div className="flex gap-2.5">
              <Button onClick={cancelNote}>Cancelar</Button>
              <Button type="primary" icon={check} onClick={saveNote}>
                Salvar anotação
              </Button>
            </div>
          </div>
        </Panel>
        <div className="flex flex-col gap-4">
          <Panel className="flex flex-col gap-5 p-6">
            <section className="flex flex-col gap-2">
              <PanelTitle small>Especificações da Sessão</PanelTitle>
              <div className="flex items-center gap-1.25">
                <Icon src={lock} color="var(--secondary)" size={12} />
                <span className="text-[11px] text-(--secondary)">
                  Somente leitura
                </span>
              </div>
            </section>
            <GameSessionCard
              colors={gameCardColors}
              icon={gameIcon}
              title={gameName}
              date={note.dateTime}
              patient={patient}
            />
            <section className="grid grid-cols-2 gap-3">
              <SessionDetails title="DURAÇÃO" value="22 minutos" icon={time} />
              <SessionDetails
                title="DIFICULDADE"
                value={noteGame?.difficulty ?? "—"}
                icon={difficulty}
              />
              <SessionDetails
                title="CONCLUSÃO"
                value="3 de 3 tentativas"
                icon={conclusion}
              />
              <SessionDetails
                title="FOCO TERAPÊUTICO"
                value={game?.skill ?? "Coordenação"}
                icon={focus}
              />
            </section>
            <hr />
            <span className="text-xs text-(--secondary) text-justify">
              Dados da sessão jogada. Estas informações não são alteradas pela
              anotação.
            </span>
          </Panel>
          <div className="flex gap-2.5 p-4.5 rounded-lg bg-(--transparent)">
            <Icon src={lock} color="var(--link)" size={17} />
            <div className="flex flex-col gap-1.25">
              <h5 className="text-[13px] text-(--primary) font-semibold">
                Vínculo preservado
              </h5>
              <span className="text-xs text-(--primary)">
                Jogo, sessão, data e hora não podem ser alterados. Você pode editar apenas o registro clínico.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}