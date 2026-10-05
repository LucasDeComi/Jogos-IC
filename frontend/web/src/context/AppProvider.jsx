import { PatientProvider } from "./PatientContext";
import { TherapistProvider } from "./TherapistContext";
import { GameProvider } from "./GameContext";
import { TherapistNoteProvider } from "./TherapistNoteContext";

export default function AppProvider({ children }) {
  return (
    <PatientProvider>
      <TherapistProvider>
        <GameProvider>
          <TherapistNoteProvider>
            {children}
          </TherapistNoteProvider>
        </GameProvider>
      </TherapistProvider>
    </PatientProvider>
  )
}
