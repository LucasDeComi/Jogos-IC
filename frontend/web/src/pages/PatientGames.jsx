import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import PatientHeader from "../components/ui/PatientHeader";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Panel from "../components/ui/Panel";
import Select from "../components/ui/Select";
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
  const [filters, setFilters] = useState({
    category: "",
    skill: "",
    difficulty: "",
  });

  const categoryOptions = [...new Set(games.map((game) => game.category))];
  const skillOptions = [...new Set(games.map((game) => game.skill))];
  const difficultyOptions = [...new Set(games.map((game) => game.difficulty))];

  const filteredGames = games.filter((game) => {
    const categoryMatch = filters.category
      ? game.category === filters.category
      : true;
    const skillMatch = filters.skill ? game.skill === filters.skill : true;
    const difficultyMatch = filters.difficulty
      ? game.difficulty === filters.difficulty
      : true;

    return categoryMatch && skillMatch && difficultyMatch;
  });

  useEffect(() => {
    setSelectedGames(patient?.games ?? []);
  }, [patient]);

  const navigate = useNavigate();

  function toggleGame(gameIndex) {
    setSelectedGames((current) =>
      current.includes(gameIndex)
        ? current.filter((index) => index !== gameIndex)
        : [...current, gameIndex],
    );
  }

  function handleFilterChange(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function saveGames() {
    setPatientGames(id, selectedGames);
    navigate(`/app/patients/${id}`);
    Swal.fire({
      title: "Jogos alterados com sucesso!",
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
    <section className="flex flex-col items-start gap-5">
      <PatientHeader
        title="Adicionar jogo ao paciente"
        description="Selecione um jogo terapêutico e defina as configurações de dificuldade e acessibilidade"
        backLinkPath={`/app/patients/${id}`}
        patient={patient}
      />

      <div className="w-full">
        <Table>
          <thead>
            <tr>
              <TableHeaderCell center bb>
                Selecionar
              </TableHeaderCell>
              <TableHeaderCell center bb bl>
                Jogo
              </TableHeaderCell>
              <TableHeaderCell center bb bl>
                Categoria
              </TableHeaderCell>
              <TableHeaderCell center bb bl>
                Habilidade
              </TableHeaderCell>
              <TableHeaderCell center bb bl>
                Dificuldade
              </TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center font-medium">
                  Nenhum jogo encontrado para estes filtros.
                </td>
              </tr>
            ) : (
              filteredGames.map((game, index) => {
                const gameIndex = games.indexOf(game);

                return (
                  <tr key={`${game.name}-${gameIndex}`}>
                    <TableActionsCell
                      center={index !== filteredGames.length - 1}
                      bb={index !== filteredGames.length - 1}
                      pl
                    >
                      <Checkbox
                        checked={selectedGames.includes(gameIndex)}
                        onChange={() => toggleGame(gameIndex)}
                      />
                    </TableActionsCell>
                    <TableBodyCell bb={index !== filteredGames.length - 1} bl>
                      {game.name}
                    </TableBodyCell>
                    <TableBodyCell bb={index !== filteredGames.length - 1} bl>
                      {game.category}
                    </TableBodyCell>
                    <TableBodyCell bb={index !== filteredGames.length - 1} bl>
                      {game.skill}
                    </TableBodyCell>
                    <TableBodyCell bb={index !== filteredGames.length - 1} bl>
                      {game.difficulty}
                    </TableBodyCell>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>

      <div className="flex gap-5">
        <Button type="primary" onClick={saveGames}>
          Salvar alterações
        </Button>
        <Button onClick={() => navigate(`/app/patients/${id}`)}>Cancelar</Button>
      </div>
    </section>
  );
}
