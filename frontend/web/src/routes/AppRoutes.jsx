import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AppLayout from "../layouts/AppLayout";
import PatientList from "../pages/PatientList";
import RegisterPatient from "../pages/RegisterPatient";
import ViewPatient from "../pages/ViewPatient";
import PatientGames from "../pages/PatientGames";
import PatientGamesHistory from "../pages/PatientGamesHistory";
import PatientSettings from "../pages/PatientSettings";
import TherapistSettings from "../pages/TherapistSettings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="/app/patients" replace />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="patients/register" element={<RegisterPatient />} />
        <Route path="patients/:id" element={<ViewPatient />} />
        <Route path="patients/games/:id" element={<PatientGames />} />
        <Route path="patients/games/history" element={<PatientGamesHistory />} />
        <Route path="patients/settings/:id" element={<PatientSettings />} />
        <Route path="settings" element={<TherapistSettings />} />
      </Route>
    </Routes>
  )
}