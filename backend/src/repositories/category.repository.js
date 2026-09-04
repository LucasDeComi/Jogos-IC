import { db } from "../lib/firebase.js";
import normalize from "../utils/normalizeText.js";

const categories = db.collection("categories");

class CategoryRepository {
  async create(data) {
    const payload = Object.assign({}, data);
    const doc = await categories.add(payload);
    return { id: doc.id, ...payload };
  }

  async find(filters) {
    if (Object.keys(filters).length === 0) return { message: "Nenhum filtro encontrado." };

    if (filters.id) {
      const doc = await categories.doc(filters.id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    if (filters.name) {
        const name = normalize(filters.name)
        const snapshot = await categories
            .where("normalizedName", ">=", name)
            .where("normalizedName", "<=", name + "\uf8ff")
            .get();

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  }

  async update(id, data) {
    const ref = categories.doc(id);
    const payload = Object.assign({}, data);
    await ref.update(payload);
    const doc = await ref.get();

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async delete(id) {
    await categories.doc(id).delete();
  }

  getRef(id) {
    const ref = categories.doc(String(id));
    return ref ?? null;
  }
}

export default new CategoryRepository();
