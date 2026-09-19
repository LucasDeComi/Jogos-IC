import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { profileColors } from "../utils/colors";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import Button from "../components/ui/Button";
import PatientCard from "../components/ui/PatientCard";
import addIcon from "../assets/icons/add.svg";

export default function PatientList() {
  const { patients } = useContext(PatientContext);

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-7.5">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-2">
          <Title>Pacientes</Title>
          <Description>Acompanhamento e evolução dos pacientes ativos no sistema</Description>
        </div>
        <Button
          type="primary"
          onClick={() => navigate("/app/patients/register")}
          icon={addIcon}
        >
          Cadastrar novo paciente
        </Button>
      </div>
      <hr />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full">
        {patients && patients.map((patient, index) => (
          <PatientCard
            color={profileColors[index % profileColors.length]}
            patient={patient}
          />
        ))}
      </div>
    </section>
  );
}
