import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { PatientContext } from "../context/PatientContext"
import Title from "../components/ui/Title"
import Button from "../components/ui/Button"
import Table from "../components/ui/Table"
import TableHeaderCell from "../components/ui/TableHeaderCell"
import TableBodyCell from "../components/ui/TableBodyCell"

export default function PatientList() {
  const { patients } = useContext(PatientContext);

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
      <Table>
        <thead>
          <tr>
            <TableHeaderCell bb pl>Prontuário</TableHeaderCell>
            <TableHeaderCell bb>Nome</TableHeaderCell>
            <TableHeaderCell bb bl>Ações</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {patients && patients.map((patient, index) => (
            <tr key={patient.id ?? index}>
              <TableBodyCell bb={index !== patients.length - 1} pl>{patient.id}</TableBodyCell>
              <TableBodyCell bb={index !== patients.length - 1}>{patient.name}</TableBodyCell>
              <TableBodyCell bb={index !== patients.length - 1} bl>
                <Link className="hover:underline" to={`/patients/${patient.id}`}>Ver</Link>
              </TableBodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}