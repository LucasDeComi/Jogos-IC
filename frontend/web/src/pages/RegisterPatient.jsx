import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { PatientContext } from "../context/PatientContext"
import Title from "../components/ui/Title"
import Panel from "../components/ui/Panel"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function RegisterPatient() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  
  const { addPatient, findPatient } = useContext(PatientContext);

  const navigate = useNavigate();

  function register() {
    if(!id || !name) {
      Swal.fire({
        title: "Preencha todos os campos.",
        confirmButtonColor: "black"
      });
      return;
    }

    const patientExists = findPatient(id);
    if(patientExists) {
      Swal.fire({
        title: "Este paciente já está cadastrado",
        confirmButtonColor: "black"
      });
      return;
    }

    addPatient(id, name);

    navigate("/patients");
  }

  return (
    <section className="flex flex-col items-start gap-15 pt-2">
      <Title>Cadastrar paciente</Title>
      <Panel className="max-w-200 flex flex-col gap-5 px-6 pt-4 pb-10">
        <Input
          type="number"
          label="Prontuário"
          placeholder="Ex: 0001"
          value={id}
          onChange={e => e.target.value.length <= 6 && setId(e.target.value)}
        />
        <Input
          label="Nome"
          placeholder="Nome do paciente"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Panel>
      <div className="flex gap-7.5 px-2.5">
        <Button
          type="primary"
          large
          onClick={() => register()}
        >
          Salvar
        </Button>
        <Button
          large
          onClick={() => navigate("/patients")}
        >
          Cancelar
        </Button>
      </div>
    </section>
  )
}