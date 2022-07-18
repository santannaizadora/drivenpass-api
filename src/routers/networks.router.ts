import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { networkSchema } from "../schemas/networks.schema.js";
import { createNetwork, getOne, getAll, deleteNetwork } from "../controllers/networks.controller.js";

const router = Router();

router.post("/new", validateToken, validateSchema(networkSchema), createNetwork);
router.get("/:id", validateToken, getOne);
router.get("/", validateToken, getAll);
router.delete("/delete/:id", validateToken, deleteNetwork);

export default router;