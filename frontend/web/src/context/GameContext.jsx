import { createContext, useState } from "react";
import Game from "../utils/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([
    new Game("Jogo 1", "Memória", "Memória"),
    new Game("Jogo 2", "Atenção", "Atenção"),
    new Game("Jogo 3", "Coordenação", "Coordenação Motora"),
    new Game("Jogo 4", "Linguagem", "Linguagem"),
    new Game("Jogo 5", "Raciocínio", "Raciocínio Lógico"),
  ]);

  function findGame(index) {
    return games[index];
  }

  return (
    <GameContext.Provider value={{ games, setGames, findGame }}>
      {children}
    </GameContext.Provider>
  );
}