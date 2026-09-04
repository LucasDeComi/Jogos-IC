import therapistRepository from "../repositories/therapist.repository.js";
import patientRepository from "../repositories/patient.repository.js";
import skillRepository from "../repositories/skill.repository.js";
import categoryRepository from "../repositories/category.repository.js";
import gameRepository from "../repositories/game.repository.js";
import { NotFoundError } from "../errors/errors.js";

class ResourceMiddleware {
  // Ensure therapist from token exists
  async ensureTherapist(req, res, next) {
    const id = req.userID;
    const therapist = await therapistRepository.find({ id });
    if (!therapist) throw new NotFoundError("Terapeuta não encontrado");
    req.therapist = therapist;
    next();
  }

  // Ensure patient exists; defaults to authenticated patient id when available
  async ensurePatient(req, res, next) {
    const id = req.body?.patientId ?? req.params?.id ?? req.userID;
    if (!id) return next();
    const patient = await patientRepository.find({ id });
    if (!patient) throw new NotFoundError("Paciente não encontrado");
    req.patient = patient;
    next();
  }

  // Ensure skill exists (param or body)
  async ensureSkill(req, res, next) {
    const id = req.params?.id ?? req.params?.skillId ?? req.body?.skillId ?? req.body?.id;
    if (!id) return next();
    const skill = await skillRepository.find({ id });
    if (!skill) throw new NotFoundError("Habilidade não encontrada");
    req.skill = skill;
    next();
  }

  // Ensure category exists (param or body)
  async ensureCategory(req, res, next) {
    const id = req.params?.id ?? req.params?.categoryId ?? req.body?.categoryId ?? req.body?.id;
    if (!id) return next();
    const category = await categoryRepository.find({ id });
    if (!category) throw new NotFoundError("Categoria não encontrada");
    req.category = category;
    next();
  }

  // Ensure game exists (param or body)
  async ensureGame(req, res, next) {
    const id = req.params?.id ?? req.body?.gameId ?? req.body?.id;
    if (!id) return next();
    const game = await gameRepository.find({ id });
    if (!game) throw new NotFoundError("Jogo não encontrado");
    req.game = game;
    next();
  }
}

export default new ResourceMiddleware();
