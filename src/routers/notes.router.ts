import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { noteSchema } from "../schemas/notes.schema.js";
import { createNote, getOne, getAll, deleteNote } from "../controllers/notes.controller.js";

const router = Router();

router.post("/new", validateToken, validateSchema(noteSchema), createNote);
router.get("/:id", validateToken, getOne);
router.get("/", validateToken, getAll);
router.delete("/delete/:id", validateToken, deleteNote);

export default router;