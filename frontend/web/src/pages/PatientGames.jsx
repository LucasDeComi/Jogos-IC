import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  function clearFilters() {
    setFilters({ category: "", skill: "", difficulty: "" });
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
      <div className="relative flex items-center w-full">
        <Button onClick={() => navigate(`/app/patients/${id}`)}>
          &larr; Voltar
        </Button>
        <Title className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          Adicionar jogo ao paciente
        </Title>
      </div>

      <div className="w-full">
        <Button onClick={() => setIsFilterOpen(true)}>Filtrar jogos</Button>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsFilterOpen(false)}
          />

          <div className="absolute left-8 top-24 z-10 w-90 rounded-xl border-2 border-black bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <Title className="text-2xl">Filtros</Title>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="cursor-pointer border-2 border-black bg-white px-2 py-1 text-lg font-bold rounded-sm"
              >
                X
              </button>
            </div>

            <Panel className="flex flex-col gap-4 p-4">
              <Select
                label="Categoria"
                value={filters.category}
                onChange={(event) =>
                  handleFilterChange("category", event.target.value)
                }
              >
                <option value="">Todas</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>

              <Select
                label="Habilidade"
                value={filters.skill}
                onChange={(event) =>
                  handleFilterChange("skill", event.target.value)
                }
              >
                <option value="">Todas</option>
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Select>

              <Select
                label="Dificuldade"
                value={filters.difficulty}
                onChange={(event) =>
                  handleFilterChange("difficulty", event.target.value)
                }
              >
                <option value="">Todas</option>
                {difficultyOptions.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Select>
            </Panel>

            <div className="mt-5 flex gap-3">
              <Button type="primary" onClick={() => setIsFilterOpen(false)}>
                Aplicar
              </Button>
              <Button onClick={clearFilters}>Limpar</Button>
            </div>
          </div>
        </div>
      )}

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
