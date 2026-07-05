import Router from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { createBloodTransfer } from "./bloodTransfer.controller.js";

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

export default router;
