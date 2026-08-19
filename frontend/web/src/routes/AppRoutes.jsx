import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PatientList from "../pages/PatientList"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/patients" element={<PatientList />}/>
      </Route>
    </Routes>
  )
}