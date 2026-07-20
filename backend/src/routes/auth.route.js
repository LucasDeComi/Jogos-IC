import { Router } from "express";
import controller from "../controllers/auth.controller.js";
import validation from "../middleware/validation.middleware.js";
import schema from "../validation/auth.schema.js";

const router = Router();

router.post("/", validation.body(schema.shape.registerTherapist), controller.create)
router.post("/login", validation.body(schema.shape.loginTherapist), controller.login);
router.get("/refresh", controller.refresh)

export default router;