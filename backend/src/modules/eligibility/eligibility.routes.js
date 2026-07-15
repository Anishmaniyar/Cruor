import { Router } from "express";
import { verifyUser } from "../auth/auth.middleware.js";
import { checkEligibility, healthScreening } from "./eligibility.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { submitScreeningDataValidation } from "./eligiblity.validation.js";

const router = Router();

router.get("/", verifyUser, checkEligibility);

router.post(
  "/screening",
  verifyUser,
  validateRequest(submitScreeningDataValidation),
  healthScreening,
);

export default router;
