import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { networkSchema } from "../schemas/networks.schema.js";

const router = Router();

router.post("/new", validateToken, validateSchema(networkSchema));
router.get("/:id", validateToken);
router.get("/", validateToken);
router.delete("/delete/:id", validateToken);

export default router;