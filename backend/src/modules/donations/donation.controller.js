import asyncHandler from "../../utils/asyncHandler.js";
import * as DonationService from "./donation.service.js";
import * as DonationRepository from "./donation.repository.js";

export const donationAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  const hospitalId = req.hospital.id;

  const donation = await DonationService.donationAppointmentService(
    appointmentId,
    hospitalId,
    req.body,
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
  const registrationId = req.params.registrationId;
  const hospitalId = req.hospital.id;

  const donation = await DonationService.donationCampaignService(
    hospitalId,
    registrationId,
    req.body,
  );
  return res.status(201).json({
    status: "success",
    data: {
      donation,
    },
    message: "Donation recorded successfully",
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

  const donations = await DonationService.viewHospitalDonationService(hospitalId);

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

  return res.status(200).json({
    status: "success",
    message: "Donation rejected successfully",
    data: rejectDonation,
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

    return res.status(200).json({
      status: "success",
      message: "Donation completed successfully",
      data: comDonation,
    });
  },
);

export const viewDashboardPageData = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const dashboard = await DonationService.viewDashboardPageService(userId);

  res.status(200).json({
    success: true,
    message: "Donation dashboard fetched successfully",
    data: dashboard,
  });
});
