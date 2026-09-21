import { useContext, useEffect } from "react"
import { TherapistContext } from "./context/TherapistContext"
import AppRoutes from "./routes/AppRoutes"

export default function App() {
  const { therapist } = useContext(TherapistContext);
  const theme = therapist.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"  : therapist.theme;
  
  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  });

  return (
    <>
      <AppRoutes />
    </>
  )
}