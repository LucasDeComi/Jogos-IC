import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import Panel from "./Panel";
import CardItem from "./CardItem";
import { blockColors as colors } from "../../utils/colors";
import game from "../../assets/icons/game.svg";
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
      className={`flex min-w-0 items-center justify-between transition-colors duration-200 hover:bg-(--input) ${compact ? "gap-2 p-3" : "gap-2.5 p-3 sm:gap-4 sm:p-5"}`}
      onClick={onClick}
    >
      <div className={`flex min-w-0 flex-1 items-center ${compact ? "gap-3" : "gap-2.5 sm:gap-4"}`}>
        <span
          className={`flex shrink-0 items-center justify-center ${compact ? "h-8 w-8 rounded-lg" : "h-10 w-10 rounded-lg sm:h-12 sm:w-12 sm:rounded-xl"}`}
          style={{ backgroundColor: color }}
        >
          <img src={game} alt="" className={compact ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6"} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:gap-1.5">
          <h4 className={`${compact ? "text-sm" : "text-sm sm:text-[16px]"} wrap-break-word font-bold text-(--text)`}>
            {name}
          </h4>
          <div className="flex flex-wrap gap-2">
            <CardItem compact={compact} colors={colors().green}>{category}</CardItem>
            <CardItem compact={compact} colors={colors().gray}>{difficulty}</CardItem>
            <CardItem compact={compact} colors={colors().red}>{skill}</CardItem>
            {movementFocuses.map((focus, index) => (
              <CardItem key={`${focus}-${index}`} compact={compact} colors={colors().yellow}>
                {focus}
              </CardItem>
            ))}
          </div>
        </div>
      </div>
      {toolButtons && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={`Desassociar ${name}`}
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--border) sm:h-8 sm:w-8
              transition-colors duration-150 hover:border-(--border-hover)
            `}
            onClick={(event) => {
              event.stopPropagation();
              removeGame();
            }}
          >
            <img src={deleteIcon} alt="" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
      {removeButton && (
        <button
          type="button"
          aria-label={`Remover ${name}`}
          className={`flex shrink-0 items-center justify-center ${compact ? "h-9 w-9 sm:h-8 sm:w-8" : "h-10 w-10 sm:h-9 sm:w-9"} rounded-lg border border-(--border) transition-colors duration-150 hover:border-(--border-hover)`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
        >
          <img src={removeIcon} alt="" className="h-3 w-3" />
        </button>
      )}
    </Panel>
  );
}
