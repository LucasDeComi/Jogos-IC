import { Router } from "express";
import authRoutes from "./auth.route.js";
import therapistRoutes from "./therapist.route.js";
import patientRoutes from "./patient.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/therapist", therapistRoutes);
router.use("/patient", patientRoutes);

export default router