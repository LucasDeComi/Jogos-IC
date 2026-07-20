import { Router } from "express";
import theraphistRoutes from "./therapist.route.js";

const router = Router();

router.use("/therapists", theraphistRoutes);

export default router