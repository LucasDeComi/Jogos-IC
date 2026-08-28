import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Panel from "../components/ui/Panel";
import Table from "../components/ui/Table";
import TableHeaderCell from "../components/ui/TableHeaderCell";
import TableBodyCell from "../components/ui/TableBodyCell";
import TableActionsCell from "../components/ui/TableActionsCell";
import Checkbox from "../components/ui/Checkbox";

export default function PatientGames() {
  const { id } = useParams();
  const { findPatient, setPatientGames } = useContext(PatientContext);
  const { games } = useContext(GameContext);
  const patient = findPatient(id);

  const [selectedGames, setSelectedGames] = useState([]);

  useEffect(() => {
    setSelectedGames(patient?.games ?? []);
  }, [patient]);

  const navigate = useNavigate();

  function toggleGame(gameIndex) {
    setSelectedGames(current =>
      current.includes(gameIndex)
        ? current.filter(index => index !== gameIndex)
        : [...current, gameIndex]
    );
  }

  function saveGames() {
    setPatientGames(id, selectedGames);
    navigate(`/patients/${id}`);
    Swal.fire({
      title: "Jogos alterados com sucesso!",
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast"
      }
    });
  }

  return (
    <section className="flex flex-col items-start gap-5">
      <div className="relative flex items-center w-full">
        <Button onClick={() => navigate(`/patients/${id}`)}>&larr; Voltar</Button>
        <Title className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          Adicionar jogo ao paciente
        </Title>
      </div>

      <div className="w-full">
        <Table>
          <thead>
            <tr>
              <TableHeaderCell center bb>Selecionar</TableHeaderCell>
              <TableHeaderCell center bb bl>Jogo</TableHeaderCell>
              <TableHeaderCell center bb bl>Categoria</TableHeaderCell>
              <TableHeaderCell center bb bl>Habilidade</TableHeaderCell>
              <TableHeaderCell center bb bl>Dificuldade</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={`${game.name}-${index}`}>
                <TableActionsCell center={index !== games.length - 1} bb={index !== games.length - 1} pl>
                  <Checkbox
                    checked={selectedGames.includes(index)}
                    onChange={() => toggleGame(index)}
                  />
                </TableActionsCell>
                <TableBodyCell bb={index !== games.length - 1} bl>{game.name}</TableBodyCell>
                <TableBodyCell bb={index !== games.length - 1} bl>{game.category}</TableBodyCell>
                <TableBodyCell bb={index !== games.length - 1} bl>{game.skill}</TableBodyCell>
                <TableBodyCell bb={index !== games.length - 1} bl>{game.difficulty}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="flex gap-5">
        <Button type="primary" onClick={saveGames}>Salvar alterações</Button>
        <Button onClick={() => navigate(`/patients/${id}`)}>Cancelar</Button>
      </div>
    </section>
  );
}