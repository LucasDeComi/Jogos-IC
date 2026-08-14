import { db } from "../lib/firebase.js";

const patients = db.collection("patients")

class PatientRepository {
    async create(id, data) {
        const doc = await patients.doc(id).set(data);
        return { id: doc.id, ...data };
    }

    async find(filters) {
        if(Object.keys(filters).length === 0) return { message: "Nenhum filtro encontrado." }

        if (filters.id) {
            const doc = await patients.doc(filters.id).get();

            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }

        if (filters.name) {
            const snapshot = await patients
                .where("name", ">=", filters.name)
                .where("name", "<=", filters.name + "\uf8ff")
                .get();
            
            return snapshot.docs;
        }

        if(filters.qrToken) {
            const snapshot = await patients
                .where("qrToken", "==", filters.qrToken)
                .limit(1)
                .get();

            if(snapshot.empty) return null;

            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
    }

    getRef(id) {
        const patientRef = patients.doc(String(id));

        return patientRef ?? null;
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