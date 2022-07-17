import { Router } from "express";
import authRouter from "./auth.router.js";
import credentialsRouter from "./credentials.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/credentials", credentialsRouter);

export default router;