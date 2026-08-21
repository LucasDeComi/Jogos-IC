import { createContext, useState } from "react";
import Swal from "sweetalert2";
import Patient from "../utils/Patient"

export const PatientContext = createContext();

export function PatientProvider({ children }) {
    const [patients, setPatients] = useState([
        new Patient("0001", "Gabriel Souza"),
        new Patient("0002", "Leonardo Nunes"),
        new Patient("0003", "João Gomes"),
    ]);

    function findPatient(id) {
        const patient = patients.filter(patient => patient.id == id)[0];
        return patient;
    }

    function addPatient(id, name) {
        const newPatient = new Patient(id, name);
        setPatients([...patients, newPatient]);
    }

    function editPatient(id, theme, style, itemsSize, contrast, useSymbols) {
        setPatients(patients.map(patient =>
            patient.id == id
            ? {...patient, theme: theme, style: style, itemsSize: itemsSize, contrast: contrast, useSymbols: useSymbols}
            : patient
        ))
    }

    return (
        <PatientContext.Provider value={{ patients, setPatients, findPatient, addPatient, editPatient }}>
            { children }
        </PatientContext.Provider>
    )
}