import Router from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { verifyUser } from "../auth/auth.middleware.js";

import {
  createCampaignSchema,
  registerCampaignSchema,
  updateCampaignSchema,
} from "./campaign.validator.js";

import {
  cancelRegistration,
  createCampaign,
  registerCampaign,
  updateCampaign,
  viewCampaign,
  viewCampaignById,
  viewCampaignRegistration,
  viewHospitalCampaign,
  viewMyRegistration,
} from "./campaign.controller.js";

const router = Router();

router.post(
  "/",
  verifyHospital,
  validateRequest(createCampaignSchema),
  createCampaign,
);

router.patch(
  "/:id",
  verifyHospital,
  validateRequest(updateCampaignSchema),
  updateCampaign,
);

router.get("/", verifyUser, viewCampaign);

router.get("/my-registration", verifyUser, viewMyRegistration);

router.get("/hospital", verifyHospital, viewHospitalCampaign);

router.get("/:id", verifyUser, viewCampaignById);

router.post(
  "/:id/register",
  verifyUser,
  validateRequest(registerCampaignSchema),
  registerCampaign,
);

router.patch("/:id/cancel-registration", verifyUser, cancelRegistration);

router.get("/:id/registrations", verifyHospital, viewCampaignRegistration);
export default router;
