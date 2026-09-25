import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";
import { GameContext } from "../context/GameContext";
import PatientHeader from "../components/ui/PatientHeader";
import Panel from "../components/ui/Panel";
import PanelTitle from "../components/ui/PanelTitle";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Label from "../components/ui/Label";
import DifficultySelect from "../components/ui/DifficultySelect";
import GameCard from "../components/ui/GameCard";
import PatientGame from "../utils/PatientGame";
import { profileColors } from "../utils/colors";
import searchIcon from "../assets/icons/search.svg";

export default function PatientGames() {
  const { id } = useParams();
  const { findPatient, setPatientGames } = useContext(PatientContext);
  const { games } = useContext(GameContext);
  const patient = findPatient(id);

  const [selectedGames, setSelectedGames] = useState([]);
  const [activeGameId, setActiveGameId] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    skill: "",
    difficulty: "",
  });

  const categoryOptions = [...new Set(games.map((game) => game.category))];
  const skillOptions = [...new Set(games.map((game) => game.skill))];
  const difficultyOptions = [
    ...new Set(
      games.map(
        (_, gameId) =>
          selectedGames.find((association) => association.gameId === gameId)
            ?.difficulty ?? "Médio",
      ),
    ),
  ];

  useEffect(() => {
    setSelectedGames(
      (patient?.games ?? []).map(
        ({ gameId, difficulty, movementFocuses }) =>
          new PatientGame(gameId, difficulty, movementFocuses),
      ),
    );
    setActiveGameId(null);
  }, [patient]);

  const navigate = useNavigate();

  function selectGame(gameIndex) {
    setActiveGameId(gameIndex);
    setSelectedGames((current) => {
      const isSelected = current.some(
        (association) => association.gameId === gameIndex,
      );

      return isSelected ? current : [...current, new PatientGame(gameIndex)];
    });
  }

  function removeActiveGame() {
    setSelectedGames((current) =>
      current.filter((association) => association.gameId !== activeGameId),
    );
    setActiveGameId(null);
  }

  function updateAssociation(gameId, changes) {
    setSelectedGames((current) =>
      current.map((association) =>
        association.gameId === gameId
          ? { ...association, ...changes }
          : association,
      ),
    );
  }

  function handleFilterChange(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  const filteredGames = games
    .map((game, gameId) => ({
      game,
      gameId,
      association: selectedGames.find((item) => item.gameId === gameId),
    }))
    .filter(({ game, association }) => {
      const searchMatch = `${game.name} ${game.category} ${game.skill}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.trim().toLocaleLowerCase("pt-BR"));
      const categoryMatch = !filters.category || game.category === filters.category;
      const skillMatch = !filters.skill || game.skill === filters.skill;
      const difficultyMatch =
        !filters.difficulty ||
        (association?.difficulty ?? "Médio") === filters.difficulty;

      return searchMatch && categoryMatch && skillMatch && difficultyMatch;
    });

  function saveGames() {
    setPatientGames(id, selectedGames);
    navigate(`/app/patients/${id}`);
    Swal.fire({
      title: "Jogos alterados com sucesso!",
      icon: "success",
      background: "var(--panel)",
      color: "var(--text)",
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

  const activeGame =
    activeGameId === null ? null : games[activeGameId] ?? null;
  const activeAssociation = selectedGames.find(
    (association) => association.gameId === activeGameId,
  );

  return (
    <section className="flex flex-col items-start gap-5 h-full">
      <PatientHeader
        title="Adicionar jogo ao paciente"
        description="Selecione um jogo terapêutico e defina as configurações de dificuldade e acessibilidade"
        backLinkPath={`/app/patients/${id}`}
        patient={patient}
      />

      <div className="grid grid-cols-[minmax(300px,3fr)_minmax(300px,2fr)] gap-6 w-full h-full">
        <section className="flex flex-col gap-5 w-full">
          <Panel className="flex flex-col gap-4 p-5 w-full">
            <Input
              icon={searchIcon}
              placeholder="Pesquisar jogos disponíveis"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-3">
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
            </div>
          </Panel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-3 w-full">
            {filteredGames.map(({ game, gameId, association }, index) => (
              <GameCard
                key={gameId}
                color={profileColors[index % profileColors.length]}
                name={game.name}
                category={game.category}
                skill={game.skill}
                movementFocuses={association?.movementFocuses}
                gameId={gameId}
                patientId={id}
                onClick={() => selectGame(gameId)}
              />
            ))}
          </div>
        </section>
        <Panel className="flex flex-col gap-6 p-6">
          <PanelTitle>Configurações do jogo</PanelTitle>
          {activeGame && activeAssociation ? (
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold text-(--text)">
                {activeGame.name}
              </h3>
              <div className="flex flex-col gap-2">
                <Label>Dificuldade</Label>
                <DifficultySelect
                  value={activeAssociation.difficulty}
                  onChange={(difficulty) =>
                    updateAssociation(activeGameId, { difficulty })
                  }
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-(--secondary)">
              Selecione um jogo para configurar sua associação com o paciente.
            </p>
          )}
        </Panel>
      </div>

      <div className="hidden gap-5">
        <Button type="primary" onClick={saveGames}>
          Salvar alterações
        </Button>
        <Button onClick={() => navigate(`/app/patients/${id}`)}>Cancelar</Button>
      </div>
    </section>
  );
}
