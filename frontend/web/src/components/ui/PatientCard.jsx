import { Link } from "react-router-dom";
import Panel from "./Panel"
import PatientCardItem from "./PatientCardItem";
import Icon from "./Icon";
import view from "../../assets/icons/view.svg"
import calendar from "../../assets/icons/calendar.svg"
import userIcon from "../../assets/icons/userIcon.svg"
import clock from "../../assets/icons/clock.svg"

export default function PatientCard({ color, patient }) {
  const { id, name } = patient;

  return (
    <Panel className="flex flex-col gap-3 p-6">
      <section className="flex justify-between items-center w-full mb-2">
        <div className="flex items-center gap-2">
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
        </div>
        <Link 
          className={`
            flex justify-center items-center w-8 h-8 border border-transparent bg-(--transparent) rounded-lg
            transition-colors duration-150 hover:bg-(--transparent-hover) hover:border-(transparent-border)
          `}
          to={`/app/patients/${id}`}
        >
          <Icon src={view} size={16} color="var(--primary)" />
        </Link>
      </section>
      <hr />
      <section className="flex justify-between items-center">
        <PatientCardItem
          icon={calendar}
          title="IDADE"
          value={`${patient.getAge()} anos`}
        />
        <PatientCardItem
          icon={userIcon}
          title="TERAPEUTA"
          value="Clara Santos"
        />
        <PatientCardItem
          icon={clock}
          title="ÚLTIMA SESSÃO"
          value="10/06/2026"
        />
      </section>
    </Panel>
  )
}
