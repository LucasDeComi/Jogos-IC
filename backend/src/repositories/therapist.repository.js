import { db } from "../lib/firebase.js";
import normalize from "../utils/normalizeText.js";

const therapists = db.collection("therapists");

class TherapistRepository {
  async create(data) {
    const doc = await therapists.add(data);
    return { id: doc.id, ...data };
  }

  async find(filters) {
    let query = therapists;

    query = filters.id ? query.where("__name__", "==", filters.id) : query; // Busca pelo identificador
    query = filters.email ? query.where("email", "==", filters.email) : query; // Busca pelo email

    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (filters.name) {
      const searchName = normalize(String(filters.name));
      return docs.filter((theraphist) =>
        normalize(String(theraphist.name || ""))
          .includes(searchName),
      );
    }

    return filters.id || filters.email ? docs[0] : docs;
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
