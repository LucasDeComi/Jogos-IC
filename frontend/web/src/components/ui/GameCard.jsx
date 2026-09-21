import { Link } from "react-router-dom";
import Panel from "./Panel"
import GameCardItem from "./GameCardItem";
import { blockColors as colors } from "../../utils/colors";
import game from "../../assets/icons/game.svg";
import view from "../../assets/icons/viewGame.svg"
import deleteIcon from "../../assets/icons/delete.svg"

export default function GameCard({ toolButtons = false, color, name, category, skill, difficulty, gameId, patientId }) {
  return (
    <Panel className="flex justify-between items-center gap-3 p-6">
        <div className="flex items-center gap-4">
            <span
                className="flex justify-center items-center w-12 h-12 rounded-xl"
                style={{ backgroundColor: color }}
            >
                <img src={game} />
            </span>
            <div className="flex flex-col justify-between">
                <h4 className="text-[16px] text-(--text) font-bold">{name}</h4>
                <div className="flex gap-2">
                    <GameCardItem colors={colors().green}>{category}</GameCardItem>
                    <GameCardItem colors={colors().gray}>{difficulty}</GameCardItem>
                    <GameCardItem colors={colors().red}>{skill}</GameCardItem>
                </div>
            </div>
        </div>
        {toolButtons &&
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
                >
                    <img src={deleteIcon} className="w-4 h-4" />
                </button>
            </div>
        }
    </Panel>
  )
}
