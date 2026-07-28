import AppError from "../../utils/appError.js";
import * as CampaignRepository from "./campaign.repository.js";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";

export const createCampaignService = async (hospitalId, campaignData) => {
  const {
    campName,
    hospitalName,
    campaignDate,
    description,
    address,
    startTime,
    endTime,
    targetDonors,
  } = campaignData;

  const HospitalExists =
    await CampaignRepository.findHospitalExists(hospitalName);

  if (!HospitalExists) {
    throw new AppError("Hospital not found");
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const campaignD = new Date(campaignDate);
  const campaignDay = new Date(
    campaignD.getFullYear(),
    campaignD.getMonth(),
    campaignD.getDate(),
  );

  if (campaignDay < today) {
    throw new AppError("Campaign date cannot be in the past", 400);
  }

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const start = new Date(campaignD);
  start.setHours(startHours, startMinutes, 0, 0);

  const end = new Date(campaignD);
  end.setHours(endHours, endMinutes, 0, 0);

  if (end <= start) {
    throw new AppError("End time must be strictly after the start time", 400);
  }

  if (targetDonors <= 0) {
    throw new AppError("Target donors are not valid entry", 400);
  }

  const campaign = await CampaignRepository.createCampaignRepository({
    hospitalId,
    campName,
    description,
    address,
    campaignDate: campaignD,
    startTime: start,
    endTime: end,
    targetDonors,
    status: "ACTIVE",
  });

  return campaign;
};

export const updateCampaignService = async (
  hospitalId,
  campaignId,
  campaignData,
) => {
  const campaign = await CampaignRepository.campaignExists(campaignId);

  if (!campaign) {
    throw new AppError("Campaign not found", 404);
  }

  if (campaign.hospitalId !== hospitalId) {
    throw new AppError("Unauthorized", 403);
  }

  const updateCampagin = await CampaignRepository.updateCampaignRepository(
    campaignId,
    campaignData,
  );

  const recipients =
    await CampaignRepository.allRegisteredUserstoCampaign(campaignId);

  await NotificationService.sendBulk({
    type: NotificationType.CAMPAIGN_UPDATED,

    recipients,
    payload: {
      campaignName: updateCampagin.campName,
      campaignDate: updateCampagin.campaignDate,
      startTime: updateCampagin.startTime,
      endTime: updateCampagin.endTime,
    },
  });

  return updateCampagin;
};

export const cancelCampaignService = async () => {};

export const getCampaignService = async () => {
  return await CampaignRepository.getCampaign();
};

export const getCampaignByIdService = async (campaignId) => {
  const campaign = await CampaignRepository.getCampaignById(campaignId);

  if (!campaign) {
    throw new AppError("Campaign not found", 404);
  }

  return campaign;
};

export const registerCampaignService = async (userId, campaignId) => {
  const campaign = await CampaignRepository.findCampaignId(campaignId);

  if (!campaign) {
    throw new AppError("Campaign not found or inactive", 404);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const campaignDate = new Date(campaign.campaignDate);
  campaignDate.setHours(0, 0, 0, 0);

  if (campaignDate < today) {
    throw new AppError("Campaign registration is closed", 400);
  }

  const existingRegistration = await CampaignRepository.alreadyRegistered(
    userId,
    campaignId,
  );

  if (existingRegistration) {
    throw new AppError("User already registered for this campaign", 409);
  }

  const registeredCount =
    await CampaignRepository.countCampaignRegistrations(campaignId);

  if (registeredCount >= campaign.targetDonors) {
    throw new AppError("Campaign registration limit reached", 409);
  }

  const registration = await CampaignRepository.createCampaignRegistration({
    userId,
    campaignId,
    status: "REGISTERED",
    registeredAt: new Date(),
  });

  await NotificationService.send({
    type: NotificationType.CAMPAIGN_REGISTERED,

    recipient: {
      userId: userId,
    },

    payload: {
      campName: campaign.campName,
      description: campaign.description,
      campaignDate: campaign.campaignDate,
    },
  });

  return registration;
};

export const cancelRegistrationService = async (userId, campaignId) => {
  const campaignExists = await CampaignRepository.findCampaignId(campaignId);

  if (!campaignExists) {
    throw new AppError("Campaign not found", 404);
  }

  const campaignRegistration = await CampaignRepository.alreadyRegistered(
    userId,
    campaignId,
  );

  if (!campaignRegistration) {
    throw new AppError("Registration not found", 404);
  }

  if (campaignRegistration.status == "CANCELLED") {
    throw new AppError("Registration already camcelled", 404);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const campaignDate = new Date(campaignExists.campaignDate);
  campaignDate.setHours(0, 0, 0, 0);

  if (campaignDate < today) {
    throw new AppError("Campaign already completed", 400);
  }

  await CampaignRepository.updateCampaignRegistrationStatusRepository(
    userId,
    campaignId,
    "CANCELLED",
  );

  await CampaignRepository.createNotification({
    userId,
    title: "Campaign Cancel Notification",
    message: `Your registration for campaign on ${campaignDate.toISOString().split("T")[0]} has been cancelled.`,
    type: "CAMPAIGN_REGISTERED",
    priority: "LOW",
    isRead: false,
  });
};

export const getMyRegistrationsService = async (userId) => {
  const allRegistrations =
    await CampaignRepository.allRegisteredCampaignRepository(userId);

  return allRegistrations;
};

export const getHospitalCampaignsService = async (hospitalId) => {
  const allHospitalCampagins =
    await CampaignRepository.allHospitalCampaigns(hospitalId);

  return allHospitalCampagins;
};

export const getCampaignRegistrationService = async (campaignId, hositalId) => {
  const campaignExist = await CampaignRepository.findCampaignId(campaignId);

  if (!campaignExist) {
    throw new AppError("Campaign not found", 404);
  }

  const hospitalOwnsCampaign = await CampaignRepository.hospitalOwnedCampaign(
    hositalId,
    campaignId,
  );

  if (!hospitalOwnsCampaign) {
    throw new AppError("Forbidden t access", 403);
  }

  const getRegisteredUsers =
    await CampaignRepository.allRegisteredUserstoCampaign(campaignId);

  return getRegisteredUsers;
};

export const completeCampaignService = async () => {};
