import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PatientList from "../pages/PatientList";
import RegisterPatient from "../pages/RegisterPatient";
import ViewPatient from "../pages/ViewPatient";
import PatientSettings from "../pages/PatientSettings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/patients" element={<PatientList />}/>
        <Route path="/patients/register" element={<RegisterPatient />}/>
        <Route path="/patients/:id" element={<ViewPatient />}/>
        <Route path="/patients/settings/:id" element={<PatientSettings />}/>
      </Route>
    </Routes>
  )
}