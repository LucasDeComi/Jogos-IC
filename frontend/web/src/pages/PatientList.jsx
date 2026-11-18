import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { profileColorValues } from "../utils/colors";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import Button from "../components/ui/Button";
import PatientCard from "../components/ui/PatientCard";
import addIcon from "../assets/icons/add.svg";

export default function PatientList() {
  const { patients } = useContext(PatientContext);

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-5 sm:gap-7.5">
      <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <Title>Pacientes</Title>
          <Description>Acompanhamento e evolução dos pacientes ativos no sistema</Description>
        </div>
        <Button
          type="primary"
          onClick={() => navigate("/app/patients/register")}
          icon={addIcon}
          className="w-full sm:w-auto"
        >
          Cadastrar novo paciente
        </Button>
      </div>
      <hr />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-5">
        {patients && patients.map((patient, index) => (
          <PatientCard
            color={profileColorValues[index % profileColorValues.length]}
            patient={patient}
          />
        ))}
      </div>
    </section>
  );
}
