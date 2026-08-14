import { Router } from "express";
import controller from "../controllers/auth.controller.js";
import validation from "../middleware/validation.middleware.js";
import rateLimit from "../middleware/rateLimit.middleware.js";
import schema from "../validation/auth.schema.js";

const router = Router();

router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Muitas tentativas. Tente novamente mais tarde.",
}));

// Rotas de Terapeuta
router.post("/therapist/register", validation.body(schema.registerTherapist), controller.createTherapist);
router.post("/therapist/login", validation.body(schema.loginTherapist), controller.loginTherapist);
router.post("/therapist/refresh", controller.refreshTherapist);

// Rotas de Paciente
router.post("/patient/register", validation.body(schema.registerPatient), controller.createPatient);
router.post("/patient/login", validation.body(schema.loginPatient), controller.loginPatient);
router.post("/patient/refresh", controller.refreshPatient);

export default router;