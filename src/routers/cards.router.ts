import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { cardSchema } from "../schemas/cards.schema.js";
import { createCard, getOne, getAll, deleteCard } from "../controllers/cards.controller.js";

const router = Router();

router.post("/new", validateToken, validateSchema(cardSchema), createCard);
router.get("/:id", validateToken, getOne);
router.get("/", validateToken, getAll);
router.delete("/delete/:id", validateToken, deleteCard);

export default router;