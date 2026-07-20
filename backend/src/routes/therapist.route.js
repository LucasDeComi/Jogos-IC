import { Router } from "express";
import controller from "../controllers/therapist.controller.js";
import auth from "../middleware/auth.middleware.js"

const router = Router();

router.use(auth);

router.get("/id/:id", controller.findById);
router.get("/email/:email", controller.findByEmail);
router.get("/name/:name", controller.findByName);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
