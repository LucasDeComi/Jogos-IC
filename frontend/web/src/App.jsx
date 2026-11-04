import { useContext, useEffect } from "react"
import { TherapistContext } from "./context/TherapistContext"
import AppRoutes from "./routes/AppRoutes"

export default function App() {
  const { therapist } = useContext(TherapistContext);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const theme = therapist.theme === "auto"
        ? colorScheme.matches ? "dark" : "light"
        : therapist.theme;
      document.documentElement.setAttribute("theme", theme);
    };

    applyTheme();
    if (therapist.theme !== "auto") return;

    colorScheme.addEventListener("change", applyTheme);
    return () => colorScheme.removeEventListener("change", applyTheme);
  }, [therapist.theme]);

  return (
    <>
      <AppRoutes />
    </>
  )
}