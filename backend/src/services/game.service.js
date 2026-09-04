import repository from "../repositories/game.repository.js";
import skillRepository from "../repositories/skill.repository.js";
import categoryRepository from "../repositories/category.repository.js";
import { FieldValue } from "firebase-admin/firestore";

class GameService {
  async create(data) {
    const payload = Object.assign({}, data);

    if (payload.skills && Array.isArray(payload.skills)) {
      payload.skills = payload.skills.map((id) => skillRepository.getRef(id));
    }

    if (payload.categories && Array.isArray(payload.categories)) {
      payload.categories = payload.categories.map((id) => categoryRepository.getRef(id));
    }

    return await repository.create(payload);
  }

  async find(filters) {
    return await repository.find(filters);
  }

  async update(id, data) {
    const payload = Object.assign({}, data);

    if (payload.skills && Array.isArray(payload.skills)) {
      payload.skills = payload.skills.map((id) => skillRepository.getRef(id));
    }

    if (payload.categories && Array.isArray(payload.categories)) {
      payload.categories = payload.categories.map((id) => categoryRepository.getRef(id));
    }

    return await repository.update(id, payload);
  }

  async delete(id) {
    return await repository.delete(id);
  }

  async appendSkill(gameId, data) {
    const skillRef = skillRepository.getRef(data.skillId);
    return await repository.update(gameId, { skills: FieldValue.arrayUnion(skillRef) });
  }

  async removeSkill(gameId, skillId) {
    const skillRef = skillRepository.getRef(skillId);
    return await repository.update(gameId, { skills: FieldValue.arrayRemove(skillRef) });
  }

  async appendCategory(gameId, data) {
    const categoryRef = categoryRepository.getRef(data.categoryId);
    return await repository.update(gameId, { categories: FieldValue.arrayUnion(categoryRef) });
  }

  async removeCategory(gameId, categoryId) {
    const categoryRef = categoryRepository.getRef(categoryId);
    return await repository.update(gameId, { categories: FieldValue.arrayRemove(categoryRef) });
  }
}

export default new GameService();
