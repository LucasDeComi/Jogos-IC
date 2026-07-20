import { Router } from "express";
import therapistRoutes from "./therapist.route.js";
import authRoutes from "./auth.route.js";

const router = Router();

router.use("/therapists", therapistRoutes);
router.use("/auth", authRoutes);

export default router