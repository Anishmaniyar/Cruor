import Router from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import {
  bloodUnitInventory,
  blooodUnitofHospital,
  updateBloodUnitPacketStatus,
  bloodUnitInventorybyId,
} from "./bloodUnit.controller.js";
import { updateBloodUnitStatusSchema } from "./bloodUnit.validator.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = Router();

router.get("/hospital", verifyHospital, blooodUnitofHospital);

router.get("/inventory", verifyHospital, bloodUnitInventory);

router.get("/inventory/:id", verifyHospital, bloodUnitInventorybyId);

router.patch(
  "/:id/status",
  verifyHospital,
  validateRequest(updateBloodUnitStatusSchema),
  updateBloodUnitPacketStatus,
);

//later this will become background job
router.patch("/:id/expire", verifyHospital);

export default router;
