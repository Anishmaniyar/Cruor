import Router from "express";
import { verifyHospital } from "../../middleware/authenticate.js";
import {
  bloodUnitInventory,
  blooodUnitofHospital,
  updateBloodUnitPacketStatus,
  bloodUnitInventorybyId,
} from "./bloodUnit.controller.js";
import { updateBloodUnitStatusSchema } from "./bloodUnit.validator.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = Router;

// blood donation creation we are not adding the api for it we will add it in the donation module after the completeDonationService

router.get("/hospital", verifyHospital, blooodUnitofHospital);

router.get("/inventory", verifyHospital, bloodUnitInventory);

router.get("/:id", verifyHospital, bloodUnitInventorybyId);

router.patch(
  "/:id/status",
  verifyHospital,
  validateRequest(updateBloodUnitStatusSchema),
  updateBloodUnitPacketStatus,
);

//later this will become background job
router.patch("/:id/expire", verifyHospital);

export default router;
