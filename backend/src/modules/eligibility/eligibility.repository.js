import prisma from "../../db.js";

export const getUserData = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      dataOfBirth: true,
      gender: true,
      bloodGroup: true,
    },
  });
};

export const getDonationData = async (userId) => {
  return await prisma.donation.findFirst({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
    orderBy: {
      donationDate: "desc",
    },
    select: {
      donationDate: true,
      bloodUnit: {
        select: {
          componentType: true,
        },
      },
    },
  });
};

export const findUserById = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
};

export const createHealthScreeningRepository = async (data) => {
  return await prisma.healthScreening.create({
    data,
  });
};

export const findUsersWithLatestDonationRepository = async () => {
  return await prisma.donation.findMany({
    where: {
      status: "COMPLETED",
    },
    orderBy: {
      donationDate: "desc",
    },
    include: {
      user: true,
      bloodUnits: {
        select: {
          componentType: true,
        },
      },
    },
  });
};
