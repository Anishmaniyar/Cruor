import { Router } from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createBloodRequestSchema,
  requestIdParamSchema,
  selectOfferSchema,
} from "./bloodRequest.validator.js";
import {
  createBloodRequestData,
  getMyRequests,
  getAvailableRequests,
  getBloodRequestById,
  getRequestResponses,
  getMyResponse,
  acceptBloodRequest,
  rejectBloodRequest,
  cancelBloodRequest,
  selectOffer,
} from "./bloodRequest.controller.js";

const router = Router();

// ── Blood Request CRUD ──────────────────────

router.post(
  "/",
  verifyHospital,
  validateRequest(createBloodRequestSchema),
  createBloodRequestData,
);

router.get("/my", verifyHospital, getMyRequests);

router.get("/available", verifyHospital, getAvailableRequests);

router.get(
  "/:id",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  getBloodRequestById,
);

// ── Responses ───────────────────────────────

router.get(
  "/:id/responses",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  getRequestResponses,
);

router.get(
  "/:id/my-response",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  getMyResponse,
);

// ── Actions ─────────────────────────────────

router.post(
  "/:id/accept",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  acceptBloodRequest,
);

router.post(
  "/:id/reject",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  rejectBloodRequest,
);

router.patch(
  "/:id/cancel",
  verifyHospital,
  validateRequest(requestIdParamSchema),
  cancelBloodRequest,
);

router.post(
  "/:id/select-offer/:responseId",
  verifyHospital,
  validateRequest(selectOfferSchema),
  selectOffer,
);

export default router;
