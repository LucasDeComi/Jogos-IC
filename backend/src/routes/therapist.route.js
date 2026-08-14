import { Router } from "express";
import controller from "../controllers/therapist.controller.js";
import schema from "../validation/therapist.schema.js";
import validation from "../middleware/validation.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.use(auth);

router.get("/", controller.find);
router.patch("/email", validation.body(schema.updateEmail), controller.updateEmail);
router.patch("/password", validation.body(schema.updatePassword), controller.updatePassword);
router.patch("/settings", validation.body(schema.updateSettings), controller.updateSettings);
router.post("/patient", validation.body(schema.appendPatient), controller.appendPatient);
router.delete("/patient/:id", controller.removePatient);
router.delete("/", controller.delete);

export default router;