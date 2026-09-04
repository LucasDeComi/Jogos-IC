import { db } from "../lib/firebase.js";
import normalize from "../utils/normalizeText.js";

const skills = db.collection("skills");

class SkillRepository {
  async create(data) {
    const payload = Object.assign({}, data);
    const doc = await skills.add(payload);
    return { id: doc.id, ...payload };
  }

  async find(filters) {
    if (Object.keys(filters).length === 0) return { message: "Nenhum filtro encontrado." };

    if (filters.id) {
      const doc = await skills.doc(filters.id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    if (filters.name) {
        const name = normalize(filters.name);
        const snapshot = await skills
            .where("normalizedName", ">=", name)
            .where("normalizedName", "<=", name + "\uf8ff")
            .get();

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  }

  async update(id, data) {
    const ref = skills.doc(id);
    const payload = Object.assign({}, data);
    await ref.update(payload);
    const doc = await ref.get();

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async delete(id) {
    await skills.doc(id).delete();
  }
}

export default new SkillRepository();
