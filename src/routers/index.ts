import { Router } from "express";
import authRouter from "./auth.router.js";
import credentialsRouter from "./credentials.router.js";
import networksRouter from "./networks.router.js";
import cardsRouter from "./cards.router.js";
import notesRouter from "./notes.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/credentials", credentialsRouter);
router.use("/networks", networksRouter);
router.use("/cards", cardsRouter);
router.use("/notes", notesRouter);

export default router;