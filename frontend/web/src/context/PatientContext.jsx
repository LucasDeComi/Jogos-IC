import { createContext, useState } from "react";
import Patient from "../utils/Patient"

export const PatientContext = createContext();

export function PatientProvider({ children }) {
    const [patients, setPatients] = useState([
        new Patient("0001", "Gabriel Souza", new Date("2017-05-12"), [0, 1, 2]),
        new Patient("0002", "Leonardo Nunes", new Date("2014-03-15"), [0, 2, 3, 4]),
        new Patient("0003", "João Gomes", new Date("2005-11-21"), [0, 2, 4]),
        new Patient("0004", "Manoel Ferreira", new Date("1988-02-25"), [1, 3, 4]),
        new Patient("0005", "Maria Lopes", new Date("2017-12-23"), [1, 2, 4, 5])
    ]);

    function findPatient(id) {
        const patient = patients.filter(patient => patient.id == id)[0];
        return patient;
    }

    function addPatient(id, name, birthDate) {
        const newPatient = new Patient(id, name, new Date(birthDate));
        setPatients([...patients, newPatient]);
    }

    function editPatient(id, theme, style, itemsSize, contrast, useSymbols) {
        setPatients(patients.map(patient =>
            patient.id == id
            ? {...patient, theme, style, itemsSize, contrast, useSymbols}
            : patient
        ))
    }

    function setPatientGames(id, updatedGames) {
        const deduplicatedGames = [...new Set(updatedGames)];

        setPatients(patients.map(patient =>
            patient.id == id
            ? { ...patient, games: deduplicatedGames }
            : patient
        ));
    }

    return (
        <PatientContext.Provider value={{ patients, setPatients, findPatient, addPatient, editPatient, setPatientGames }}>
            { children }
        </PatientContext.Provider>
    )
}