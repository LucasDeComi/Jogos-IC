import repository from "../repositories/skill.repository.js";
import Named from "../utils/Named.js";

class SkillService {
  async create(data) {
    const normalizedData = new Named(data.name);
    return await repository.create(normalizedData);
  }

  async find(filters) {
    return await repository.find(filters);
  }

  async update(id, data) {
    const normalizedData = new Named(data.name);
    return await repository.update(id, normalizedData);
  }

  async delete(id) {
    return await repository.delete(id);
  }
}

export default new SkillService();
