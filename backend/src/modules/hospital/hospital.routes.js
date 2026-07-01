import Router from "express";
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
} from "./hospital.validation.js";

import { verifyHospital } from "../../middleware/authorize.js";

const router = Router();

router.get(
  "/hospitals/search",
  validateRequest(searchHospitalSchema),
  searchHospital,
);

router.get("/hospitals", getHospitals);
router.get("/hospitals/:id", getHospitalId);

router.patch(
  "/hospitals/:id",
  verifyHospital,
  validateRequest(updateHospitalSchema),
  updateHospital,
);

export default router;
