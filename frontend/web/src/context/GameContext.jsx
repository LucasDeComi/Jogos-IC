import { createContext, useState } from "react";
import { createInitialGames } from "../data/initialGames";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState(createInitialGames);

  function findGame(index) {
    return games[index];
  }

  return (
    <GameContext.Provider value={{ games, setGames, findGame }}>
      {children}
    </GameContext.Provider>
  );
}