import service from "../services/game.service.js";

class GameController {
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

  async appendSkill(req, res) {
    const result = await service.appendSkill(req.params.id, req.body);
    res.status(200).json(result);
  }

  async removeSkill(req, res) {
    const result = await service.removeSkill(req.params.id, req.body.skillId);
    res.status(200).json(result);
  }

  async appendCategory(req, res) {
    const result = await service.appendCategory(req.params.id, req.body);
    res.status(200).json(result);
  }

  async removeCategory(req, res) {
    const result = await service.removeCategory(req.params.id, req.body.categoryId);
    res.status(200).json(result);
  }
}

export default new GameController();
