import prisma from "../../db.js";

export const findAppointmentById = async (appointmentId) => {
  return await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });
};

export const createDonationRepo = async (tx, donationData) => {
  return await tx.donation.create({
    data: donationData,
  });
};

export const appointmentBelongsToHospitalRepo = async (
  appointmentId,
  hospitalId,
) => {
  return await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      hospitalId: hospitalId,
      status: "VALID",
    },
    select: {
      userId: true,
    },
  });
};

export const existingDonationRepo = async (hospitalId, appointmentId) => {
  return await prisma.donation.findFirst({
    where: {
      hospitalId: hospitalId,
      appointmentId: appointmentId,
    },
  });
};

export const viewMyDonationUserRepo = async (userId) => {
  return await prisma.donation.findMany({
    where: {
      userId: userId,
    },
    select: {
      donationDate: true,
      bloodGroup: true,
      volume: true,
      status: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const viewMyDonationUserIdRepo = async (userId, donationId) => {
  return await prisma.donation.findFirst({
    where: {
      userId: userId,
      id: donationId,
    },
    select: {
      donationDate: true,
      bloodGroup: true,
      volume: true,
      status: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const viewHospitalDonationRepo = async (hospitalId) => {
  return await prisma.donation.findMany({
    where: {
      hospitalId: hospitalId,
      status: "COMPLETED",
    },
    select: {
      id: true,
      donationDate: true,
      bloodGroup: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
};

export const findDonationForRejectionRepo = async (donationId, hospitalId) => {
  return await prisma.donation.findFirst({
    where: {
      id: donationId,
      hospitalId: hospitalId,
    },
  });
};

export const findHospitalDonationRepository = async (
  hospitalId,
  donationId,
) => {
  return await prisma.donation.findFirst({
    where: {
      id: donationId,
      hospitalId,
    },
    include: {
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const updateDonationStatusRepo = async (donationId, status) => {
  return await prisma.donation.update({
    where: { id: donationId },
    data: { status: status },
  });
};

export const updateAppointmentStatusRepo = async (tx, appointmentId) => {
  return await tx.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: "COMPLETED",
    },
  });
};

export const countAllDonation = async (userId) => {
  return await prisma.donation.count({
    where: { userId },
  });
};

export const countAppointmentDonation = async (userId) => {
  return await prisma.donation.count({
    where: {
      userId: userId,
      status: "COMPLETED",
      appointmentId: {
        not: null,
      },
    },
  });
};

export const countCampaignDonation = async (userId) => {
  return await prisma.donation.count({
    where: {
      userId: userId,
      status: "COMPLETED",
      campaignRegistrationId: {
        not: null,
      },
    },
  });
};

export const getLastDonationDate = async (userId) => {
  const lastDonation = await prisma.donation.findFirst({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
    // Sort from newest to oldest
    orderBy: {
      createdAt: "desc",
    },
    // Only fetch the date field to maximize performance
    select: {
      createdAt: true,
    },
  });

  // Returns the date string/object if found, otherwise returns null
  return lastDonation ? lastDonation.createdAt : null;
};

export const viewUserHistoryDonation = async (userId) => {
  const donations = await prisma.donation.findMany({
    where: { userId },
    select: {
      id: true,
      donationDate: true,
      status: true,
      hospital: {
        select: { name: true },
      },
      appointment: {
        select: { appointmentTime: true },
      },
      campaignRegistration: {
        select: {
          campaign: {
            select: { startTime: true },
          },
        },
      },
    },
  });

  // Map the results to clean up the null fields
  return donations.map((donation) => {
    // Extract the time from whichever source exists
    const exactTime =
      donation.appointment?.appointmentTime ||
      donation.campaignRegistration?.campaign?.startTime ||
      null;

    return {
      id: donation.id,
      donationDate: donation.donationDate,
      status: donation.status,
      hospitalName: donation.hospital.name,
      type: donation.appointment ? "Appointment" : "Campaign",
      time: exactTime,
    };
  });
};
