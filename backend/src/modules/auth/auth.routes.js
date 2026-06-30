import Router from "express";
import { registerUser } from "./auth.controller.js";
import { registerUserSchema } from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login");

export default router;
