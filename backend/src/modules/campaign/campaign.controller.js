import asyncHandler from "../../utils/asyncHandler.js";
import * as campaignService from "./campaign.service.js";

export const createCampaign = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const campaignData = {
    ...req.body,
    hospitalName: req.hospital.name,
  };

  const campaign = await campaignService.createCampaignService(
    hospitalId,
    campaignData,
  );

  return res.status(201).json({
    status: "success",
    data: {
      campaign,
    },
    message: "Campaign created successfully",
  });
});

export const updateCampaign = asyncHandler(async (req, res) => {
  const campaignId = req.params.id;
  const hospitalId = req.hospital.id;

  const campaignData = req.body;

  const campaign = await campaignService.updateCampaignService(
    hospitalId,
    campaignId,
    campaignData,
  );

  return res.status(200).json({
    status: "success",
    data: {
      campaign,
    },
    message: "Campaign updated successfully",
  });
});

export const cancelCampaign = asyncHandler(async (req, res) => {});

export const viewCampaign = asyncHandler(async (req, res) => {
  const campaigns = await campaignService.getCampaignService();

  return res.status(200).json({
    status: "success",
    results: campaigns.length,
    data: campaigns,
  });
});

export const viewCampaignById = asyncHandler(async (req, res) => {
  const campaignId = req.params.id;

  const campaign = await campaignService.getCampaignByIdService(campaignId);

  return res.status(200).json({
    status: "success",
    data: campaign,
  });
});

export const registerCampaign = asyncHandler(async (req, res) => {
  const campaignId = req.params.id;

  const userId = req.user.id;

  const campaignRegistration = await campaignService.registerCampaignService(
    userId,
    campaignId,
  );

  return res.status(200).json({
    status: "success",
    data: campaignRegistration,
  });
});

export const cancelRegistration = asyncHandler(async (req, res) => {
  const campaignId = req.params.id;

  const userId = req.user.id;

  const cancelRegistration = await campaignService.cancelRegistrationService(
    userId,
    campaignId,
  );

  return res.status(200).json({
    status: "success",
    message: "Registration cancelled successfully",
  });
});

export const viewMyRegistration = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const allRegistration =
    await campaignService.getMyRegistrationsService(userId);

  return res.status(200).json({
    status: "Success",
    data: {
      allRegistration,
      totalRegistrations: allRegistration.length,
    },
    message: "All registered campaign fetched successfully",
  });
});

export const viewHospitalCampaign = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const allCampaigns =
    await campaignService.getHospitalCampaignsService(hospitalId);

  return res.status(200).json({
    status: "success",
    data: {
      allCampaigns,
      totalCampaigns: allCampaigns.length,
    },
    message: "All hospital campagins fetched successfully",
  });
});

export const viewCampaignRegistration = asyncHandler(async (req, res) => {
  const campaignId = req.params.id;

  const hospitalId = req.hospital.id;

  const allRegistrations = await campaignService.getCampaignRegistrationService(
    campaignId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    data: {
      totalRegistrations: allRegistrations.length,
      allRegistrations,
    },
    message: "All registrations fetched successfully",
  });
});

export const completeCampaign = asyncHandler(async (req, res) => {});
