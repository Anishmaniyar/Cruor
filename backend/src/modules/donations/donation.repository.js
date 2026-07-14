import prisma from "../../db.js";

export const findAppointmentById = async (appointmentId) => {
  return await prisma.appointment.findUnique({
    where: {
      appointmentId,
    },
  });
};

export const createDonationRepo = async (donationData) => {
  return await prisma.donation.create({
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
