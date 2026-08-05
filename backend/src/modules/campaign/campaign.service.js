import AppError from "../../utils/appError.js";
import * as CampaignRepository from "./campaign.repository.js";

export const createCampaignService = async (hospitalId, campaignData) => {
  const {
    campName,
    campaignDate,
    description,
    address,
    startTime,
    endTime,
    targetDonors,
  } = campaignData;

  // Hospital is already authenticated via verifyHospital middleware
  // No need to look it up again by name

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
  // 1. Fetch the current state of the campaign from the database
  const campaign = await CampaignRepository.campaignExists(campaignId);

  if (!campaign) {
    throw new AppError("Campaign not found", 404);
  }

  if (campaign.hospitalId !== hospitalId) {
    throw new AppError("Unauthorized", 403);
  }

  // 2. Prepare an object to hold only the fields we actually want to update
  const finalUpdatePayload = {};

  // Handle targetDonors if it's being updated
  if (campaignData.targetDonors !== undefined) {
    finalUpdatePayload.targetDonors = Number(campaignData.targetDonors);
  }

  // Handle basic string fields
  if (campaignData.campName)
    finalUpdatePayload.campName = campaignData.campName;
  if (campaignData.description)
    finalUpdatePayload.description = campaignData.description;
  if (campaignData.address)
    finalUpdatePayload.address = campaignData.address;

  // 3. Smart Date/Time Merging Logic
  // Figure out what date to use (either the new incoming date, or the old one from the DB)
  const baseDateSource = campaignData.campaignDate || campaign.campaignDate;
  const dateString = new Date(baseDateSource).toISOString().split("T")[0];

  if (campaignData.campaignDate) {
    finalUpdatePayload.campaignDate = new Date(campaignData.campaignDate);
  }

  // If startTime is updating, combine it with our base date string
  if (campaignData.startTime) {
    finalUpdatePayload.startTime = new Date(
      `${dateString}T${campaignData.startTime}:00.000Z`,
    );
  } else if (campaignData.campaignDate) {
    // If date changed but startTime didn't, we still need to move the old time to the new date
    const oldTimePart = new Date(campaign.startTime)
      .toISOString()
      .split("T")[1];
    finalUpdatePayload.startTime = new Date(`${dateString}T${oldTimePart}`);
  }

  // If endTime is updating, combine it with our base date string
  if (campaignData.endTime) {
    finalUpdatePayload.endTime = new Date(
      `${dateString}T${campaignData.endTime}:00.000Z`,
    );
  } else if (campaignData.campaignDate) {
    // If date changed but endTime didn't, move the old time to the new date
    const oldTimePart = new Date(campaign.endTime).toISOString().split("T")[1];
    finalUpdatePayload.endTime = new Date(`${dateString}T${oldTimePart}`);
  }

  // 4. Validate endTime > startTime if either is being updated
  // Normalize both times to epoch date so we only compare the time components
  const resolvedStart =
    finalUpdatePayload.startTime || campaign.startTime;
  const resolvedEnd = finalUpdatePayload.endTime || campaign.endTime;

  const startMs =
    new Date(resolvedStart).getHours() * 60 +
    new Date(resolvedStart).getMinutes();
  const endMs =
    new Date(resolvedEnd).getHours() * 60 +
    new Date(resolvedEnd).getMinutes();

  if (endMs <= startMs) {
    throw new AppError("End time must be strictly after the start time", 400);
  }

  // 5. Pass the safely assembled partial payload to your repository
  const updatedCampaign = await CampaignRepository.updateCampaignRepository(
    campaignId,
    finalUpdatePayload,
  );

  return updatedCampaign;
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

export const getHospitalCampaignByIdService = async (hospitalId, campaignId) => {
  const campaign = await CampaignRepository.findHospitalCampaignById(
    hospitalId,
    campaignId,
  );

  if (!campaign) {
    throw new AppError("Campaign not found or you don't have access", 404);
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

  // await NotificationService.send({
  //   type: NotificationType.CAMPAIGN_REGISTERED,

  //   recipient: {
  //     userId: userId,
  //   },

  //   payload: {
  //     campName: campaign.campName,
  //     description: campaign.description,
  //     campaignDate: campaign.campaignDate,
  //   },
  // });

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

export const getCampaignRegistrationService = async (campaignId, hospitalId) => {
  // Single query: checks both campaign existence AND hospital ownership
  const campaign = await CampaignRepository.findCampaignByHospital(
    hospitalId,
    campaignId,
  );

  if (!campaign) {
    throw new AppError("Campaign not found or you don't have access", 404);
  }

  const registeredUsers =
    await CampaignRepository.allRegisteredUserstoCampaign(campaignId);

  return registeredUsers;
};

export const completeCampaignService = async () => {};
