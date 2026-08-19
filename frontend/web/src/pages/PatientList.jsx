import PrimaryButton from "../components/ui/PrimaryButton"
import TableHeaderCell from "../components/ui/TableHeaderCell"
import TableBodyCell from "../components/ui/TableBodyCell"

export default function PatientList() {
  return (
    <section className="flex flex-col items-start gap-7.5">
      <h1 className="font-bold text-2xl">Pacientes</h1>
      <PrimaryButton>+ Cadastrar novo paciente</PrimaryButton>
      <div className="w-full border-2 border-black rounded-md text-lg">
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
      </div>
    </section>
  )
}