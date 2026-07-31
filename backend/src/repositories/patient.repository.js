import { db } from "../lib/firebase.js";
import normalize from "../utils/normalizeText.js";

const patients = db.collection("patients")

class PatientRepository {
    async create(data) {
        const doc = await patients.add(data);
        return { id: doc.id, ...data };
    }

    async find(filters) {
        let query = patients;

        query = filters.id ? query.where("__name__", "==", filters.id) : query; // Busca pelo identificador

        const snapshot = await query.get();
        const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (filters.name) {
            const searchName = normalize(String(filters.name));
            return docs.filter((patient) =>
                normalize(String(patient.name || ""))
                    .includes(searchName),
            );
        }

        return filters.id ? docs[0] ?? null : docs;
    }
    
    async update(id, data) {
        const ref = patients.doc(id);

        await ref.update(data);

        const doc = await ref.get();

        return {
            id: doc.id,
            ...doc.data()
        }
    }

    async delete(id) {
        await patients.doc(id).delete();
    }
}

export default new PatientRepository();