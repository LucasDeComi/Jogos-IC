import { Router } from "express";
import theraphistRoutes from "./therapist.route.js";
import authRoutes from "./auth.route.js";

const router = Router();

router.use("/therapists", theraphistRoutes);
router.use("/auth", authRoutes);

export default router