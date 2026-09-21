import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import BackLink from "../components/ui/BackLink";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import Panel from "../components/ui/Panel";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Tip from "../components/ui/Tip";

export default function RegisterPatient() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const { addPatient, findPatient } = useContext(PatientContext);

  const navigate = useNavigate();

  function register() {
    if (!id || !name || !birth) {
      Swal.fire({
        title: "Preencha todos os campos.",
        confirmButtonColor: "#0F7675",
      });
      return;
    }

    if(new Date(birth) > new Date()) {
      Swal.fire({
        title: "A data de nascimento não pode estar no futuro.",
        confirmButtonColor: "#0F7675",
      });
      return;
    }

    const patientExists = findPatient(id);
    if (patientExists) {
      Swal.fire({
        title: "Este paciente já está cadastrado",
        confirmButtonColor: "#0F7675",
      });
      return;
    }

    addPatient(id, name, birth);

    navigate("/app/patients");
    Swal.fire({
      title: "Paciente cadastrado com sucesso!",
      icon: "success",
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
    <form autoComplete="off" className="flex flex-col items-start gap-6 pt-2">
      <BackLink to="/app/patients">Voltar para a lista</BackLink>
      <div className="flex flex-col gap-2">
        <Title>Cadastrar paciente</Title>
        <Description>
          Adicione um novo perfil de paciente ao SJR para começar o tratamento
        </Description>
      </div>
      <hr />
      <Panel className="max-w-200 flex flex-col gap-5 px-8 py-7">
        <Input
          type="number"
          label="Prontuário"
          placeholder="Ex: 0001"
          autoComplete="off"
          value={id}
          onChange={(e) => e.target.value.length <= 6 && setId(e.target.value)}
        />
        <Input
          label="Nome"
          placeholder="Nome do paciente"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          label="Data de nascimento"
          autoComplete="off"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <Tip>
          Prontuário e Nome do paciente não podem ser editados após a criação do
          cadastro.
        </Tip>
        <div className="flex gap-7.5">
          <Button type="primary" onClick={() => register()} className="px-7">
            Cadastrar
          </Button>
          <Button onClick={() => navigate("/app/patients")} className="px-7">
            Cancelar
          </Button>
        </div>
      </Panel>
    </form>
  );
}
