import Game from "../utils/Game";
import { profileColors } from "../utils/colors";

const movementFocuses = [
  "Mãos (Gestos finos)",
  "Braços (Coordenação ampla)",
  "Pernas (Deslocamento)",
  "Tronco (Postura)",
  "Cabeça / Pescoço",
];

const gameCatalog = [
  ["Jogo 1", "Memória", "Memória"],
  ["Jogo 2", "Atenção", "Atenção"],
  ["Jogo 3", "Coordenação", "Coordenação Motora"],
  ["Jogo 4", "Linguagem", "Linguagem"],
  ["Jogo 5", "Raciocínio", "Raciocínio Lógico"],
];

export function createInitialGames() {
  return gameCatalog.map(
    ([name, category, skill], index) =>
      new Game(
        name,
        category,
        skill,
        profileColors[index % profileColors.length],
        movementFocuses,
      ),
  );
}
