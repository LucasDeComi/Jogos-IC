import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { TherapistContext } from "../context/TherapistContext";
import { GameContext } from "../context/GameContext";
import { profileColors } from "../utils/colors";
import { formatDateTime } from "../utils/formatDates";
import PatientHeader from "../components/ui/PatientHeader";
import Panel from "../components/ui/Panel";
import PanelHeader from "../components/ui/PanelHeader";
import Label from "../components/ui/Label";
import Radio from "../components/ui/Radio";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";
import sessionIcon from "../assets/icons/control.svg";
import gameIcon from "../assets/icons/game.svg";
import clinicalRegister from "../assets/icons/clinical-register.svg";
import check from "../assets/icons/check.svg";

export default function AddNote() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [content, setContent] = useState("");
  const { findPatient, addTherapistNote } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);
  const { therapist } = useContext(TherapistContext);

  const patient = patientId ? findPatient(patientId) ?? null : null;
  const patientGames = (patient?.games ?? []).map(
    ({ gameId: patientGameId, notes = [] }) => ({
      id: patientGameId,
      name:
        findGame(patientGameId)?.name ?? `Jogo ${Number(patientGameId) + 1}`,
      sessions: notes,
    }),
  );
  const selectedGame = patientGames.find(
    ({ id }) => id === selectedGameId,
  );

  function saveNote() {
    if (
      selectedGameId === null ||
      selectedSessionId === null ||
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
      evolutionLevel: "Alta",
      supportLevel: "Médio",
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

  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <PatientHeader
        title="Adicionar anotação"
        description={`Selecione uma sessão de ${patient.getName()} e registre suas observações clínicas.`}
        backLinkTitle="Voltar às notas do terapeuta"
        backLinkPath={`/app/patients/notes/${patientId}`}
        patient={patient}
      />
      <section className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 w-full">
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
                {patientGames.map(({ id, name }, index) => (
                  <Radio
                    key={id}
                    title={name}
                    icon={gameIcon}
                    iconColor={profileColors[index % profileColors.length]}
                    checked={selectedGameId === id}
                    onClick={() => {
                      setSelectedGameId(id);
                      setSelectedSessionId(null);
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
                        checked={selectedSessionId === (session.id ?? index)}
                        onClick={() => setSelectedSessionId(session.id ?? index)}
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
            />
          </div>
          <hr />
          <div className="flex justify-between items-center px-6 py-4.5">
            <span className="text-xs text-(--secondary)">Responsável: {therapist.name}</span>
            <div className="flex gap-2.5">
              <Button onClick={() => navigate(`/app/patients/notes/${patientId}`)}>Cancelar</Button>
              <Button type="primary" icon={check} onClick={saveNote}>
                Salvar anotação
              </Button>
            </div>
          </div>
        </Panel>
        <Panel></Panel>
      </section>
    </div>
  )
}