import { PatientProvider } from "./PatientContext"

export default function AppProvider({ children }) {
  return (
    <PatientProvider>
        {children}
    </PatientProvider>
  )
}
