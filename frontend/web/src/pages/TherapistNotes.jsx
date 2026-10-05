import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import PatientHeader from "../components/ui/PatientHeader";
import Filter from "../components/ui/Filter";
import add from "../assets/icons/add.svg";

export default function TherapistNotes() {
  const { id } = useParams();

  const { findPatient } = useContext(PatientContext);
  const patient = findPatient(id);

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
      <section className="flex justify-between items-end w-full"></section>
    </div>
  )
}