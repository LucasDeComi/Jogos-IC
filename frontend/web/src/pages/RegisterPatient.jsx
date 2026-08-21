import { useNavigate } from "react-router-dom"
import Title from "../components/ui/Title"
import Panel from "../components/ui/Panel"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function RegisterPatient() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col items-start gap-15 pt-2">
      <Title>Cadastrar paciente</Title>
      <Panel className="max-w-200 flex flex-col gap-5 px-6 pt-4 pb-10">
        <Input label="Prontuário" placeholder="Ex: 0001" />
        <Input label="Nome" placeholder="Nome do paciente" />
      </Panel>
      <div className="flex gap-7.5 px-2.5">
        <Button type="primary" large>Salvar</Button>
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