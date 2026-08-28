import { PatientProvider } from "./PatientContext";
import { TherapistProvider } from "./TherapistContext";
import { GameProvider } from "./GameContext";

export default function AppProvider({ children }) {
  return (
    <PatientProvider>
      <TherapistProvider>
        <GameProvider>
          {children}
        </GameProvider>
      </TherapistProvider>
    </PatientProvider>
  )
}
