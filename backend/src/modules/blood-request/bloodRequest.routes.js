import Router from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  bloodRequestBodySchema,
  cancelBloodRequestSchema,
  approveBloodRequestSchema,
  rejectBloodRequestSchema,
} from "./bloodRequest.validator.js";
import {
  createBloodRequestData,
  getMyBloodRequests,
  getBloodRequestById,
  cancelBloodRequest,
  approveBloodRequest,
  rejectBloodRequest,
} from "./bloodRequest.controller.js";

const router = Router();

router.post(
  "/",
  verifyHospital,
  validateRequest(bloodRequestBodySchema),
  createBloodRequestData,
);

router.get("/my", verifyHospital, getMyBloodRequests);

router.get("/:id", verifyHospital, getBloodRequestById);

router.patch(
  "/:id/cancel",
  verifyHospital,
  validateRequest(cancelBloodRequestSchema),
  cancelBloodRequest,
);

router.patch(
  "/:id/approve",
  verifyHospital,
  validateRequest(approveBloodRequestSchema),
  approveBloodRequest,
);

router.patch(
  "/:id/reject",
  verifyHospital,
  validateRequest(rejectBloodRequestSchema),
  rejectBloodRequest,
);

export default router;
