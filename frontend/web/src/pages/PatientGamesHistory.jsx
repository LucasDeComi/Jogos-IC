import { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Table from "../components/ui/Table";
import TableHeaderCell from "../components/ui/TableHeaderCell";
import TableBodyCell from "../components/ui/TableBodyCell";

export default function PatientGamesHistory() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const gameId = searchParams.get("game");

  const { findPatient } = useContext(PatientContext);
  const { findGame } = useContext(GameContext);

  const patient = findPatient(patientId);
  const game = gameId !== null ? findGame(Number(gameId)) : null;

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-5">
      <div className="flex items-start justify-between w-full gap-4">
        <Button onClick={() => navigate(`/patients/${patientId}`)}>&larr; Voltar</Button>

        <div className="flex flex-col items-center gap-1 pt-1 text-center">
          <Title>
            {game ? `Histórico de jogos - ${game.name}` : "Histórico de jogos"}
          </Title>
          <span>
            {patient ? `Paciente: ${patient.name} (${patient.id})` : "Paciente não encontrado"}
          </span>
        </div>

        <div className="w-30" />
      </div>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell center bb>Data</TableHeaderCell>
            <TableHeaderCell center bb bl>Tempo de jogo</TableHeaderCell>
            <TableHeaderCell center bb bl>Pontuação</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableBodyCell bb pl>10/05/2024 - 14:30</TableBodyCell>
            <TableBodyCell bb bl>00:05:21</TableBodyCell>
            <TableBodyCell bb bl>850</TableBodyCell>
          </tr>
          <tr>
            <TableBodyCell bb pl>12/05/2024 - 15:10</TableBodyCell>
            <TableBodyCell bb bl>00:06:02</TableBodyCell>
            <TableBodyCell bb bl>920</TableBodyCell>
          </tr>
          <tr>
            <TableBodyCell bb pl>14/05/2024 - 16:45</TableBodyCell>
            <TableBodyCell bb bl>00:07:15</TableBodyCell>
            <TableBodyCell bb bl>1050</TableBodyCell>
          </tr>
          <tr>
            <TableBodyCell bb pl>16/05/2024 - 10:20</TableBodyCell>
            <TableBodyCell bb bl>00:04:50</TableBodyCell>
            <TableBodyCell bb bl>780</TableBodyCell>
          </tr>
          <tr>
            <TableBodyCell pl>18/05/2024 - 11:05</TableBodyCell>
            <TableBodyCell bl>00:06:30</TableBodyCell>
            <TableBodyCell bl>980</TableBodyCell>
          </tr>
        </tbody>
      </Table>
    </section>
  );
}