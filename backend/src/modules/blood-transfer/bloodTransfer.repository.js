import { prisma } from "../../db.js";

export const createBloodTransferRepository = async (data) => {
  return await prisma.bloodTransfer.create({
    data,
  });
};

export const getSentTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      senderHospitalId: hospitalId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReceivedTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      receiverHospitalId: hospitalId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findHospitalTransferRepository = async (
  hospitalId,
  transferId,
) => {
  return await prisma.bloodTransfer.findFirst({
    where: {
      id: transferId,
      OR: [
        {
          sourceHospitalId: hospitalId,
        },
        {
          destinationHospitalId: hospitalId,
        },
      ],
    },
    include: {
      bloodRequest: true,
      sourceHospital: true,
      destinationHospital: true,
      bloodUnits: {
        include: {
          bloodUnit: true,
        },
      },
    },
  });
};

export const updateTransferStatusRepository = async (transferId, status) => {
  return await prisma.bloodTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      status,
    },
  });
};
