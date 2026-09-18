import { Router } from "express";
import { verifyUser } from "../auth/auth.middleware.js";
import { getDashboard } from "./dashboard.controller.js";

const router = Router();

router.get("/", verifyUser, getDashboard);

export default router;
