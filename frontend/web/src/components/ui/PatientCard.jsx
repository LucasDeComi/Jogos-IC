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
    <Panel className="flex min-w-0 flex-col gap-3 p-4 transition-colors duration-200 hover:bg-(--input) sm:p-5 lg:p-6" onClick={() => navigate(`/app/patients/${id}`)}>
      <section className="flex items-center gap-2">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-11 sm:w-11"
          style={{ backgroundColor: color, fontFamily: '"Onest", "Inter", sans-serif' }}
        >
          {patient.getInitials()}
        </span>
        <div className="flex flex-col justify-center">
          <h4 className="text-[15px] font-bold text-(--text) sm:text-[16px]">{name}</h4>
          <span className="text-xs text-(--secondary)">Prontuário {id}</span>
        </div>
      </section>
      <hr />
      <section className="grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:grid-cols-3">
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
        <div className="col-span-2 sm:col-span-1">
          <PatientCardItem
            icon={clock}
            title="ÚLTIMA SESSÃO"
            value={latestSession ? formatDate(latestSession) : "—"}
          />
        </div>
      </section>
    </Panel>
  );
}
