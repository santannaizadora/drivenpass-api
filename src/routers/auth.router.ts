import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/auth.schema.js";
import { logon } from "../controllers/auth.controller.js";

const router = Router();

router.post("/logon", validateSchema(userSchema), logon);

export default router;
