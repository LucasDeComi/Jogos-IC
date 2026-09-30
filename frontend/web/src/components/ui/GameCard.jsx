import { useContext } from "react";
import { Link } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext";
import Panel from "./Panel";
import GameCardItem from "./GameCardItem";
import { blockColors as colors } from "../../utils/colors";
import game from "../../assets/icons/game.svg";
import view from "../../assets/icons/chartBar.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import removeIcon from "../../assets/icons/remove.svg";
import Swal from "sweetalert2";

export default function GameCard({
  toolButtons = false,
  color,
  name,
  category,
  skill,
  difficulty,
  movementFocuses = [],
  gameId,
  patientId,
  onClick,
  removeButton = false,
  onRemove,
  compact = false,
}) {
  const { findPatient, setPatientGames } = useContext(PatientContext);
  const patient = findPatient(patientId);

  async function removeGame() {
    const result = await Swal.fire({
      title: "Tem certeza que deseja desassociar esse jogo ao paciente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Desassociar",
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

    if (result.isConfirmed) {
      setPatientGames(
        patientId,
        patient.games.filter((association) => association.gameId !== gameId),
      );
      Swal.fire({
        title: "Jogo desassociado com sucesso!",
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
  }

  return (
    <Panel
      className={`flex justify-between items-center ${compact ? "gap-2 p-3" : "gap-3 p-6"}`}
      onClick={onClick}
    >
      <div className={`flex items-center ${compact ? "gap-3" : "gap-4"} w-full`}>
        <span
          className={`flex shrink-0 justify-center items-center ${compact ? "w-8 h-8 rounded-lg" : "min-w-12 min-h-12 rounded-xl"}`}
          style={{ backgroundColor: color }}
        >
          <img src={game} className={compact ? "w-4 h-4" : ""} />
        </span>
        <div className="flex flex-col justify-between">
          <h4 className={`${compact ? "text-sm" : "text-[16px]"} text-(--text) font-bold`}>
            {name}
          </h4>
          <div className="flex flex-wrap gap-2">
            <GameCardItem colors={colors().green}>{category}</GameCardItem>
            <GameCardItem colors={colors().gray}>{difficulty}</GameCardItem>
            <GameCardItem colors={colors().red}>{skill}</GameCardItem>
            {movementFocuses.map((focus, index) => (
              <GameCardItem key={`${focus}-${index}`} colors={colors().yellow}>
                {focus}
              </GameCardItem>
            ))}
          </div>
        </div>
      </div>
      {toolButtons && (
        <div className="flex items-center gap-3">
          <Link
            className={`
              flex justify-center items-center w-8 h-8 border border-(--border) rounded-lg
              transition-colors duration-150 hover:border-(--border-hover)
            `}
            to={`/app/patients/games/history?patient=${patientId}&game=${gameId}`}
          >
            <img src={view} className="w-4 h-4" />
          </Link>
          <button
            className={`
              flex justify-center items-center w-8 h-8 border border-(--border) rounded-lg
              transition-colors duration-150 hover:border-(--border-hover)
            `}
            onClick={removeGame}
          >
            <img src={deleteIcon} className="w-4 h-4" />
          </button>
        </div>
      )}
      {removeButton && (
        <button
          type="button"
          aria-label={`Remover ${name}`}
          className={`flex shrink-0 justify-center items-center ${compact ? "w-7 h-7" : "w-8 h-8"} border border-(--border) rounded-lg transition-colors duration-150 hover:border-(--border-hover)`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
        >
          <img src={removeIcon} alt="" className="w-3 h-3" />
        </button>
      )}
    </Panel>
  );
}
