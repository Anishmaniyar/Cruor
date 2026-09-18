import { Router } from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createBloodTransfer,
  getSentTransfers,
  getReceivedTransfers,
  getTransferById,
  createBloodTransferController,
  getSentTransfersController,
  getReceivedTransfersController,
  getTransferByIdController,
  updateTransferStatusController,
} from "./bloodTransfer.controller.js";

const router = Router();

router.post("/:requestId", verifyHospital, createBloodTransfer);

router.get("/sent", verifyHospital, getSentTransfers);

router.get("/received", verifyHospital, getReceivedTransfers);

router.get("/:id", verifyHospital, getTransferById);

router.patch(
  "/:id/cancel",
  verifyHospital,
  validateRequest(cancelTransferSchema),
  cancelTransfer,
);

router.post(
  "/",
  verifyHospital,
  validateRequest(createBloodTransferSchema),
  createBloodTransferController,
);

router.get("/sent", verifyHospital, getSentTransfersController);

router.get("/received", verifyHospital, getReceivedTransfersController);

router.get("/:id", verifyHospital, getTransferByIdController);

router.patch(
  "/:id/status",
  verifyHospital,
  validateRequest(updateTransferStatusSchema),
  updateTransferStatusController,
);

export default router;
