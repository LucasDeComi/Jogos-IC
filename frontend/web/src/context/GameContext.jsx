import { createContext, useState } from "react";
import Game from "../utils/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([
    new Game("Jogo 1", "Memória", "Memória", "Médio"),
    new Game("Jogo 2", "Atenção", "Atenção", "Fácil"),
    new Game("Jogo 3", "Coordenação", "Coordenação Motora", "Difícil"),
    new Game("Jogo 4", "Linguagem", "Linguagem", "Médio"),
    new Game("Jogo 5", "Raciocínio", "Raciocínio Lógico", "Difícil"),
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