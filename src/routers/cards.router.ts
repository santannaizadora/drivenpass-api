import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { cardSchema } from "../schemas/cards.schema.js";

const router = Router();

router.post("/new", validateToken, validateSchema(cardSchema));
router.get("/:id", validateToken);
router.get("/", validateToken);
router.delete("/delete/:id", validateToken);

export default router;