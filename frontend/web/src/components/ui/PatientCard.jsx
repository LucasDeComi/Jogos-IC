import { useNavigate } from "react-router-dom";
import Panel from "./Panel";
import PatientCardItem from "./PatientCardItem";
import calendar from "../../assets/icons/calendar.svg";
import diagnostic from "../../assets/icons/diagnostic.svg";
import clock from "../../assets/icons/clock.svg";
import { formatDate } from "../../utils/formatDates";

export default function PatientCard({ color, patient }) {
  const { id, name } = patient;
  const latestSession = (patient.games ?? [])
    .flatMap((game) => game.notes ?? [])
    .reduce(
      (latest, note) =>
        !latest || note.dateTime > latest ? note.dateTime : latest,
      null,
    );

  const navigate = useNavigate();
  
  return (
    <Panel className="flex flex-col gap-3 p-6 transition-colors duration-200 hover:bg-(--input)" onClick={() => navigate(`/app/patients/${id}`)}>
      <section className="flex items-center gap-2">
        <span
          className="flex justify-center items-center w-11 h-11 rounded-full text-white text-[15px] font-bold"
          style={{ backgroundColor: color, fontFamily: '"Onest", "Inter", sans-serif' }}
        >
          {patient.getInitials()}
        </span>
        <div className="flex flex-col justify-center">
          <h4 className="text-[16px] text-(--text) font-bold">{name}</h4>
          <span className="text-xs text-(--secondary)">Prontuário {id}</span>
        </div>
      </section>
      <hr />
      <section className="flex justify-between items-center">
        <PatientCardItem
          icon={calendar}
          title="IDADE"
          value={`${patient.getAge()} anos`}
        />
        <PatientCardItem
          icon={diagnostic}
          title="DIAGNÓSTICO"
          value={patient.diagnosis || "Não informado"}
        />
        <PatientCardItem
          icon={clock}
          title="ÚLTIMA SESSÃO"
          value={latestSession ? formatDate(latestSession) : "—"}
        />
      </section>
    </Panel>
  );
}
