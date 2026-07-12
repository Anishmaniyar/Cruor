import Router from "express";
import { verifyHospital } from "../../middleware/authorize.js";
import { verifyUser } from "../auth/auth.middleware.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  completeDonationController,
  donationAppointment,
  donationCampaign,
  rejectDonationController,
  viewHospitalDonation,
  viewMyDonationsUser,
  viewMyDonationUserId,
} from "./donation.controller.js";
import {
  createAppointmentDonationSchema,
  createCampaignDonationSchema,
} from "./donation.validator.js";

const router = Router();

router.post(
  "/appointments/:appointmentId",
  verifyHospital,
  validateRequest(createAppointmentDonationSchema),
  donationAppointment,
);

router.post(
  "/campaigns/:registrationId",
  verifyHospital,
  validateRequest(createCampaignDonationSchema),
  donationCampaign,
);

router.get("/my", verifyUser, viewMyDonationsUser);

router.get("/my/:id", verifyUser, viewMyDonationUserId);

router.get("/hospital", verifyHospital, viewHospitalDonation);

router.patch("/:id/reject", verifyHospital, rejectDonationController);

router.patch("/:id/complete", verifyHospital, completeDonationController);

export default router;
