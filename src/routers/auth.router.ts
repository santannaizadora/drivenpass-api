import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/auth.schema.js";
import { login, logon } from "../controllers/auth.controller.js";

const router = Router();

router.post("/logon", validateSchema(userSchema), logon);
router.post("/login", validateSchema(userSchema), login);

export default router;
