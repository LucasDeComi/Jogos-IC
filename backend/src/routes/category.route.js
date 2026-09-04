import { Router } from "express";
import controller from "../controllers/category.controller.js";
import schema from "../validation/category.schema.js";
import validation from "../middleware/validation.middleware.js";
import { authTherapist } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authTherapist);

router.post("/", validation.body(schema.create), controller.create);
router.get("/", controller.find);
router.patch("/:id", validation.body(schema.update), controller.update);
router.delete("/:id", controller.delete);

export default router;
