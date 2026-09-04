import { Router } from "express";
import authRoutes from "./auth.route.js";
import therapistRoutes from "./therapist.route.js";
import patientRoutes from "./patient.route.js";
import skillsRoutes from "./skill.route.js";
import categoriesRoutes from "./category.route.js";
import gameRoutes from "./game.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/therapist", therapistRoutes);
router.use("/patient", patientRoutes);
router.use("/skills", skillsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/games", gameRoutes);

export default router