import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { credentialsSchema } from "../schemas/credentials.schema.js";
import { createCredential } from "../controllers/credentials.controller.js";


const router = Router();

router.post("/new", validateToken, validateSchema(credentialsSchema), createCredential);

export default router;
