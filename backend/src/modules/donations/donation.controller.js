import asyncHandler from "../../utils/asyncHandler.js";
import * as DonationService from "./donation.service.js";

export const donationAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const hospitalId = req.hospital.id;
  const { donationData } = req.body;

  const donation = await DonationService.donationAppointmentService(
    appointmentId,
    hospitalId,
    donationData,
  );

  return res.status(201).json({
    status: "success",
    data: {
      donation,
    },
    message: "Donation recoreded successfully",
  });
});

export const donationCampaign = asyncHandler(async (req, res, next) => {
  const registrationId = req.params.id;
  const hospitalId = req.hospita.id;
  const { donationData } = req.body;

  const donation = await DonationService.donationCampaignService(
    hospitalId,
    registrationId,
    donationData,
  );
  return res.status(201).json({
    status: "success",
    data: {
      donation,
    },
    message: "Donation recoreded successfully",
  });
});

export const viewMyDonationsUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const donations = await DonationService.viewMyDonationService(userId);

  return res.status(200).json({
    status: "success",
    data: {
      totalDonation: donations.length,
      donations,
    },
    message: "Donations fetched successfully",
  });
});

export const viewMyDonationUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const donationId = req.params.id;

  const donations = await DonationService.viewMyDonationIdService(
    userId,
    donationId,
  );

  return res.status(200).json({
    status: "success",
    data: {
      totalDonation: donations.length,
      donations,
    },
    message: "Donations fetched successfully",
  });
});

export const viewHospitalDonation = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const donations = await DonationService.viewMyDonationIdService(hospitalId);

  return res.status(200).json({
    status: "success",
    data: {
      totalDonation: donations.length,
      donations,
    },
    message: "User Donations for Hospital fetched successfully",
  });
});

export const rejectDonationController = asyncHandler(async (req, res, next) => {
  const donationId = req.params.id;

  const hospitalId = req.hospital.id;

  const rejectDonation = await DonationService.rejectDonationService(
    donationId,
    hospitalId,
  );

  return res.status(204).json({
    status: "success",
    message: "Donation rejected successfully",
  });
});

export const completeDonationController = asyncHandler(
  async (req, res, next) => {
    const donationId = req.params.id;

    const hospitalId = req.hospital.id;

    const comDonation = await DonationService.completeDonationService(
      donationId,
      hospitalId,
    );

    return res.status(204).json({
      status: "success",
      message: "Donation completed successfully",
    });
  },
);
