import { Router } from "express";
import authRoutes from "./auth.route.js";
import therapistRoutes from "./therapist.route.js";
import patientRoutes from "./patient.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/therapists", therapistRoutes);
router.use("/patients", patientRoutes);

export default router