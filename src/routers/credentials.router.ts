import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { credentialsSchema } from "../schemas/credentials.schema.js";
import { createCredential, findOne, findAll, deleteOne } from "../controllers/credentials.controller.js";


const router = Router();

router.post("/new", validateToken, validateSchema(credentialsSchema), createCredential);
router.get("/:id", validateToken, findOne);
router.get("/", validateToken, findAll);
router.delete("/delete/:id", validateToken, deleteOne);

export default router;
