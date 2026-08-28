import { PatientProvider } from "./PatientContext";
import { TherapistProvider } from "./TherapistContext";

export default function AppProvider({ children }) {
  return (
    <PatientProvider>
      <TherapistProvider>
        {children}
      </TherapistProvider>
    </PatientProvider>
  )
}
