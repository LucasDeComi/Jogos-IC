import { createContext, useState } from "react";
import Game from "../utils/Game";
import { profileColors } from "../utils/colors";

const movementFocuses = [
  "Mãos (Gestos finos)",
  "Braços (Coordenação ampla)",
  "Pernas (Deslocamento)",
  "Tronco (Postura)",
  "Cabeça / Pescoço",
];

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState(
    [
      ["Jogo 1", "Memória", "Memória"],
      ["Jogo 2", "Atenção", "Atenção"],
      ["Jogo 3", "Coordenação", "Coordenação Motora"],
      ["Jogo 4", "Linguagem", "Linguagem"],
      ["Jogo 5", "Raciocínio", "Raciocínio Lógico"],
    ].map(
      ([name, category, skill], index) =>
        new Game(
          name,
          category,
          skill,
          profileColors[index % profileColors.length],
          movementFocuses,
        ),
    ),
  );

  function findGame(index) {
    return games[index];
  }

  return (
    <GameContext.Provider value={{ games, setGames, findGame }}>
      {children}
    </GameContext.Provider>
  );
}