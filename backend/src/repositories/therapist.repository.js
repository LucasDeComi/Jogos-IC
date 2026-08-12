import { db } from "../lib/firebase.js";

const therapists = db.collection("therapists");

class TherapistRepository {
  async create(data) {
    const doc = await therapists.add(data);
    return { id: doc.id, ...data };
  }

  async find(filters) {
    if(Object.keys(filters).length === 0) return { message: "Nenhum filtro encontrado." }

    if (filters.id) {
      const doc = await therapists.doc(filters.id).get();

      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    if (filters.email) {
      const snapshot = await therapists
        .where("email", "==", filters.email)
        .limit(1)
        .get();

      const doc = snapshot.docs[0];

      return doc ? { id: doc.id, ...doc.data() } : null;
    }

    if (filters.name) {
      const snapshot = await therapists
        .where("name", ">=", filters.name)
        .where("name", "<=", filters.name + "\uf8ff")
        .get();
      
      return snapshot.docs;
    }
  }
  
  async update(id, data) {
    const ref = therapists.doc(id);

    await ref.update(data);

    const doc = await ref.get();

    return {
      id: doc.id,
      ...doc.data()
    }
  }

  async delete(id) {
    await therapists.doc(id).delete();
  }
}

export default new TherapistRepository();
