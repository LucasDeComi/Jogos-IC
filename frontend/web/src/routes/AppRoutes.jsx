import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PatientList from "../pages/PatientList";
import RegisterPatient from "../pages/RegisterPatient";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/patients" element={<PatientList />}/>
        <Route path="/patients/register" element={<RegisterPatient />}/>
      </Route>
    </Routes>
  )
}