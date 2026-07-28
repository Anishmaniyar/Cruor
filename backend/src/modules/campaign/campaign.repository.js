import prisma from "../../db.js";

export const createCampaignRepository = async (data) => {
  return await prisma.campaign.create({
    data,
  });
};

export const updateCampaignRepository = async (campaignId, data) => {
  return await prisma.campaign.update({
    where: {
      id: campaignId,
    },
    data,
  });
};

export const campaignExists = async (camapignId) => {
  return await prisma.campaign.findUnique({
    where: {
      id: camapignId,
    },
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
      campaignDate: { gte: new Date() },
    },
    orderBy: {
      campaignDate: "asc",
    },
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  });
};

export const getCampaignById = async (campaignId) => {
  return await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
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

export const allRegisteredCampaignRepository = async (userId) => {
  return await prisma.campaignRegistration.findMany({
    where: {
      userId,
    },
    include: {
      campaign: true,
    },
  });
};

export const allHospitalCampaigns = async (hospitalId) => {
  return await prisma.campaign.findMany({
    where: {
      hospitalId,
    },
    select: {
      campName: true,
      description: true,
      address: true,
      campaignDate: true,
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
      status: "REGISTERED",
    },
    select: {
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

export const findHospitalExists = async (hospitalName) => {
  return await prisma.hospital.findFirst({
    where: {
      name: hospitalName,
    },
  });
};
