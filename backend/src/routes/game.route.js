import { Router } from "express";
import controller from "../controllers/game.controller.js";
import schema from "../validation/game.schema.js";
import validation from "../middleware/validation.middleware.js";
import { authTherapist } from "../middleware/auth.middleware.js";
import resource from "../middleware/resource.middleware.js";

const router = Router();

router.use(authTherapist);

router.post("/", validation.body(schema.create), controller.create); // Criar Jogo
router.get("/", controller.find); // Buscar Jogos
router.patch("/:id", resource.ensureGame, validation.body(schema.update), controller.update); // Atualizar Jogo
router.delete("/:id", resource.ensureGame, controller.delete); // Apagar Jogo
router.post("/:id/skill", resource.ensureGame, validation.body(schema.appendSkill), resource.ensureSkill, controller.appendSkill); // Associar Habilidade
router.delete("/:id/skill", resource.ensureGame, validation.body(schema.appendSkill), resource.ensureSkill, controller.removeSkill); // Remover Habilidade (skillId no body)
router.post("/:id/category", resource.ensureGame, validation.body(schema.appendCategory), resource.ensureCategory, controller.appendCategory); // Associar Categoria
router.delete("/:id/category", resource.ensureGame, validation.body(schema.appendCategory), resource.ensureCategory, controller.removeCategory); // Remover Categoria (categoryId no body)

export default router;