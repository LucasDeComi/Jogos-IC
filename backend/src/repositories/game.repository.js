import { db } from "../lib/firebase.js";

const games = db.collection("games");

class GameRepository {
  async create(data) {
    const payload = Object.assign({}, data);
    const doc = await games.add(payload);
    return { id: doc.id, ...payload };
  }

  async find(filters) {
    if (Object.keys(filters).length === 0) return { message: "Nenhum filtro encontrado." };

    if (filters.id) {
      const doc = await games.doc(filters.id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    if (filters.name) {
      const snapshot = await games
        .where("name", ">=", filters.name)
        .where("name", "<=", filters.name + "\uf8ff")
        .get();

      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    if (filters.difficulty) {
      const snapshot = await games.where("difficulty", "==", filters.difficulty).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  }

  async update(id, data) {
    const ref = games.doc(id);
    const payload = Object.assign({}, data);
    await ref.update(payload);
    const doc = await ref.get();

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async delete(id) {
    await games.doc(id).delete();
  }

  getRef(id) {
    const ref = games.doc(String(id));
    return ref ?? null;
  }
}

export default new GameRepository();
