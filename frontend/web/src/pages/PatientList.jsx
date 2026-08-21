import { useNavigate } from "react-router-dom"
import Title from "../components/ui/Title"
import Button from "../components/ui/Button"
import Panel from "../components/ui/Panel"
import TableHeaderCell from "../components/ui/TableHeaderCell"
import TableBodyCell from "../components/ui/TableBodyCell"

export default function PatientList() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-7.5">
      <Title>Pacientes</Title>
      <Button
        type="primary"
        onClick={() => navigate("/patients/register")}
      >
        + Cadastrar novo paciente
      </Button>
      <Panel>
        <table className="w-full">
          <thead>
            <tr>
              <TableHeaderCell bb pl>Prontuário</TableHeaderCell>
              <TableHeaderCell bb>Nome</TableHeaderCell>
              <TableHeaderCell bb bl>Ações</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableBodyCell bb pl>0001</TableBodyCell>
              <TableBodyCell bb>Paciente 1</TableBodyCell>
              <TableBodyCell bb bl>Ver</TableBodyCell>
            </tr>
            <tr>
              <TableBodyCell bb pl>0002</TableBodyCell>
              <TableBodyCell bb>Paciente 2</TableBodyCell>
              <TableBodyCell bb bl>Ver</TableBodyCell>
            </tr>
            <tr>
              <TableBodyCell bb pl>0003</TableBodyCell>
              <TableBodyCell bb>Paciente 3</TableBodyCell>
              <TableBodyCell bb bl>Ver</TableBodyCell>
            </tr>
            <tr>
              <TableBodyCell pl>0004</TableBodyCell>
              <TableBodyCell>Paciente 4</TableBodyCell>
              <TableBodyCell bl>Ver</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </Panel>
    </section>
  )
}