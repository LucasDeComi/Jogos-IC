import { db } from "../lib/firebase.js";

const patients = db.collection("patients")

class PatientRepository {
    async create(data) {
        const doc = await patients.add(data);
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