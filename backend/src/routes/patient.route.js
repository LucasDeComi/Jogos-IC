import { Router } from "express";
import controller from "../controllers/patient.controller.js";
import schema from "../validation/patient.schema.js";
import validation from "../middleware/validation.middleware.js";
import { authPatient } from "../middleware/auth.middleware.js";
import resource from "../middleware/resource.middleware.js";

const router = Router();

router.use(authPatient);
router.use(resource.ensurePatient);

router.get("/", controller.find);
router.patch("/settings", validation.body(schema.updateSettings), controller.updateSettings);

export default router;