import { Router } from "express";
import {
  getHospitals,
  getHospitalId,
  updateHospital,
  searchHospital,
} from "./hospital.controller.js";

import { validateRequest } from "../../middleware/validateRequest.js";

import {
  updateHospitalSchema,
  searchHospitalSchema,
} from "./hospital.validator.js";

import { verifyHospital } from "../../middleware/authorize.js";

const router = Router();

// Router is mounted at /hospitals in src/routes/index.js,
// so these paths are relative to it (no double /hospitals prefix).
router.get("/search", validateRequest(searchHospitalSchema), searchHospital);

router.get("/", getHospitals);
router.get("/:id", getHospitalId);

router.patch(
  "/:id",
  verifyHospital,
  validateRequest(updateHospitalSchema),
  updateHospital,
);

export default router;
