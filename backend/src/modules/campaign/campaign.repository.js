import prisma from "../../db.js";

export const updateCampaignRepository = async (campaignId, data) => {
  return await prisma.campaign.update({
    where: {
      id: campaignId,
    },
    data,
  });
};

export const findCampaignId = async (campaignId) => {
  return await prisma.campaign.findFirst({
    where: {
      id: campaignId,
      status: "ACTIVE",
    },
    include: {
      campaignRegistration: true,
    },
  });
};

export const getCampaign = async () => {
  return await prisma.campaign.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      campaignDate: "asc",
    },
  });
};

export const getCampaignById = async (campaignId) => {
  return await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
  });
};

export const createNotification = async (data) => {
  return await prisma.notification.create({
    data,
  });
};

export const alreadyRegistered = async (userId, campaignId) => {
  return await prisma.campaignRegistration.findFirst({
    where: {
      userId,
      campaignId,
    },
  });
};

export const countCampaignRegistrations = async (campaignId) => {
  return await prisma.campaignRegistration.count({
    where: {
      campaignId,
      status: "REGISTERED",
    },
  });
};

export const createCampaignRegistration = async (data) => {
  return await prisma.campaignRegistration.create({
    data,
  });
};

export const updateCampaignRegistrationStatusRepository = async (
  userId,
  campaignId,
  status,
) => {
  return await prisma.campaignRegistration.update({
    where: {
      userId_campaignId: {
        userId,
        campaignId,
      },
    },
    data: {
      status,
    },
  });
};

export const allRegisteredCampaignRepository = async (Id) => {
  return await prisma.campaignRegistration.findMany({
    where: {
      Id,
    },
  });
};

export const allHospitalCampaigns = async (Id) => {
  return await prisma.campaign.findMany({
    where: {
      hospitalId,
    },
    select: {
      campName: true,
      description: true,
      address: true,
      campDate: true,
      startTime: true,
      endTime: true,
      targetDonors: true,
      status: true,
    },
  });
};

export const hospitalOwnedCampaign = async (hospitalId, campaignId) => {
  return await prisma.campaign.findFirst({
    where: {
      hospitalId,
      id: campaignId,
    },
  });
};

export const allRegisteredUserstoCampaign = async (campaignId) => {
  return await prisma.campaignRegistration.findMany({
    where: {
      campaignId,
    },
    select: {
      status: true,
      registeredAt: true,
      user: {
        select: {
          name: true,
          phoneNo: true,
          bloodGroup: true,
        },
      },
    },
  });
};
