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
import Checkbox from "../components/ui/Checkbox";
import DifficultySelect from "../components/ui/DifficultySelect";
import GameCard from "../components/ui/GameCard";
import PatientGame from "../utils/PatientGame";
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
        ({ gameId, difficulty, movementFocuses, notes }) =>
          new PatientGame(gameId, difficulty, movementFocuses, notes),
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

      if (isSelected) {
        return current;
      }

      return [...current, new PatientGame(gameIndex)];
    });
  }

  async function removeActiveGame(gameId) {
    const result = await Swal.fire({
      title: "Remover jogo associado?",
      text: `Deseja remover ${games[gameId]?.name} da lista?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remover",
      confirmButtonColor: "var(--button)",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      background: "var(--panel)",
      color: "var(--text)",
      customClass: {
        popup: "swal2-app-popup",
        title: "swal2-app-title",
        confirmButton: "swal2-app-confirm",
        cancelButton: "swal2-app-cancel",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    setPatientGames(
      id,
      (patient?.games ?? []).filter(
        (association) => association.gameId !== gameId,
      ),
    );
    if (activeGameId === gameId) {
      setActiveGameId(null);
    }
    Swal.fire({
      title: `${games[gameId]?.name} removido com sucesso!`,
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

  function updateAssociation(gameId, changes) {
    setSelectedGames((current) =>
      current.map((association) =>
        association.gameId === gameId
          ? { ...association, ...changes }
          : association,
      ),
    );
  }

  function toggleMovementFocus(focus) {
    setSelectedGames((current) => {
      return current.map((association) => {
        if (association.gameId !== activeGameId) {
          return association;
        }

        const movementFocuses = association.movementFocuses.includes(focus)
          ? association.movementFocuses.filter((item) => item !== focus)
          : [...association.movementFocuses, focus];

        return { ...association, movementFocuses };
      });
    });
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

  async function saveGames() {
    const result = await Swal.fire({
      title: "Confirmar alterações?",
      text: "As alterações na lista de jogos serão aplicadas ao paciente.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "var(--button)",
      cancelButtonText: "Continuar editando",
      reverseButtons: true,
      background: "var(--panel)",
      color: "var(--text)",
      customClass: {
        popup: "swal2-app-popup",
        title: "swal2-app-title",
        confirmButton: "swal2-app-confirm",
        cancelButton: "swal2-app-cancel",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    setPatientGames(id, selectedGames);
    Swal.fire({
      title: `${activeGame.name} ${isNewActiveGame ? "adicionado" : "editado"} com sucesso!`,
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

  async function cancelChanges() {
    const savedGames = patient?.games ?? [];
    const gamesToKeep = selectedGames.filter((association) => {
      const isSaved = savedGames.some(
        (savedGame) => savedGame.gameId === association.gameId,
      );
      const hasConfiguration =
        association.difficulty !== "Médio" ||
        (association.movementFocuses ?? []).length > 0;

      return isSaved || hasConfiguration;
    });
    const hasChanges =
      gamesToKeep.length !== savedGames.length ||
      gamesToKeep.some((association) => {
        const savedAssociation = savedGames.find(
          (savedGame) => savedGame.gameId === association.gameId,
        );

        if (
          !savedAssociation ||
          savedAssociation.difficulty !== association.difficulty
        ) {
          return true;
        }

        const movementFocuses = association.movementFocuses ?? [];
        const savedMovementFocuses = savedAssociation.movementFocuses ?? [];

        return (
          movementFocuses.length !== savedMovementFocuses.length ||
          movementFocuses.some((focus) => !savedMovementFocuses.includes(focus))
        );
      });

    if (!hasChanges) {
      setSelectedGames(gamesToKeep);
      setActiveGameId(null);
      return;
    }

    const result = await Swal.fire({
      title: "Descartar alterações?",
      text: "As alterações ainda não salvas serão perdidas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Descartar alterações",
      confirmButtonColor: "var(--button)",
      cancelButtonText: "Continuar editando",
      reverseButtons: true,
      background: "var(--panel)",
      color: "var(--text)",
      customClass: {
        popup: "swal2-app-popup",
        title: "swal2-app-title",
        confirmButton: "swal2-app-confirm",
        cancelButton: "swal2-app-cancel",
      },
    });

    if (result.isConfirmed) {
      setSelectedGames(
        (patient?.games ?? []).map(
          ({ gameId, difficulty, movementFocuses, notes }) =>
            new PatientGame(gameId, difficulty, movementFocuses, notes),
        ),
      );
      setActiveGameId(null);
    }
  }

  const activeGame =
    activeGameId === null ? null : games[activeGameId] ?? null;
  const activeAssociation = selectedGames.find(
    (association) => association.gameId === activeGameId,
  );
  const isNewActiveGame =
    activeGameId !== null &&
    !patient?.games?.some((association) => association.gameId === activeGameId);

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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 w-full">
            {filteredGames.map(({ game, gameId }) => (
              <GameCard
                key={gameId}
                color={game.color}
                name={game.name}
                category={game.category}
                skill={game.skill}
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
              <div className="flex flex-col gap-4">
                <Label>Focos de movimento (Partes do corpo)</Label>
                <div className="flex flex-col gap-6">
                  {activeGame.movementFocuses.map((focus) => (
                    <Checkbox
                      key={focus}
                      label={focus}
                      checked={activeAssociation.movementFocuses.includes(focus)}
                      onChange={() => toggleMovementFocus(focus)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-5">
                <Button type="primary" size="large" onClick={saveGames}>
                  {isNewActiveGame ? "Adicionar Jogo" : "Salvar alterações"}
                </Button>
                <Button size="large" onClick={cancelChanges}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-(--secondary)">
              Selecione um jogo para configurar sua associação com o paciente.
            </p>
          )}
          <hr />
          <div className="flex flex-col gap-3">
            {selectedGames
              .filter(({ gameId }) =>
                patient?.games?.some((association) => association.gameId === gameId),
              )
              .map(({ gameId }) => {
                const game = games[gameId];

                if (!game) {
                  return null;
                }

                return (
                  <GameCard
                    key={gameId}
                    color={game.color}
                    name={game.name}
                    gameId={gameId}
                    patientId={id}
                    onClick={() => selectGame(gameId)}
                    removeButton
                    onRemove={() => removeActiveGame(gameId)}
                    compact
                  />
                );
              })}
          </div>
        </Panel>
      </div>

    </section>
  );
}
