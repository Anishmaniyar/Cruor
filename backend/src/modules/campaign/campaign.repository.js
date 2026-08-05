import prisma from "../../db.js";

export const createCampaignRepository = async (data) => {
  return await prisma.campaign.create({
    data,
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
        },
      },
    },
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
      campaignRegistrations: true,
    },
  });
};

export const getCampaign = async () => {
  // Start of today, so today's campaigns are NOT excluded (the stored
  // date-only value is midnight, which would be < new Date() otherwise).
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return await prisma.campaign.findMany({
    where: {
      status: "ACTIVE",
      campaignDate: { gte: startOfToday },
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
      id: true,
      campName: true,
      description: true,
      address: true,
      campaignDate: true,
      startTime: true,
      endTime: true,
      targetDonors: true,
      status: true,
      _count: {
        select: {
          campaignRegistrations: {
            where: { status: "REGISTERED" },
          },
        },
      },
    },
  });
};

export const findHospitalCampaignById = async (hospitalId, campaignId) => {
  return await prisma.campaign.findFirst({
    where: { id: campaignId, hospitalId },
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      _count: {
        select: {
          campaignRegistrations: {
            where: { status: "REGISTERED" },
          },
        },
      },
    },
  });
};

// Single-query: checks both campaign existence AND hospital ownership in one call
export const findCampaignByHospital = async (hospitalId, campaignId) => {
  return await prisma.campaign.findFirst({
    where: {
      id: campaignId,
      hospitalId,
    },
    select: {
      id: true,
      campName: true,
      campaignDate: true,
      targetDonors: true,
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
      id: true,
      registeredAt: true,
      user: {
        select: {
          id: true,
          name: true,
          phoneNo: true,
          bloodGroup: true,
        },
      },
    },
  });
};

export const findRegistrationById = async (registrationId) => {
  return await prisma.campaignRegistration.findUnique({
    where: {
      id: registrationId,
    },
    include: {
      campaign: {
        select: {
          id: true,
          hospitalId: true,
          campName: true,
        },
      },
    },
  });
};


