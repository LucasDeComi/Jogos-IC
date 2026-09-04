import service from "../services/skill.service.js";

class SkillController {
  async create(req, res) {
    const result = await service.create(req.body);
    res.status(201).json(result);
  }

  async find(req, res) {
    const result = await service.find(req.query);
    res.status(200).json(result);
  }

  async update(req, res) {
    const result = await service.update(req.params.id, req.body);
    res.status(200).json(result);
  }

  async delete(req, res) {
    const result = await service.delete(req.params.id);
    res.status(200).json(result);
  }
}

export default new SkillController();
