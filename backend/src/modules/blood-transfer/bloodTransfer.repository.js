import { prisma } from "../../db.js";

export const createBloodTransferRepository = async (data) => {
  return await prisma.bloodTransfer.create({
    data,
  });
};

export const getSentTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      sourceHospitalId: hospitalId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReceivedTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      destinationHospitalId: hospitalId,
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

export const findBloodRequestByIdRepository = async (tx, requestId) => {
  return await tx.bloodRequest.findUnique({
    where: {
      id: requestId,
    },
  });
};

export const findBloodUnitsByIdsRepository = async (tx, bloodUnitIds) => {
  return await tx.bloodUnit.findMany({
    where: {
      id: {
        in: bloodUnitIds,
      },
    },
  });
};

export const createBloodTransferRepository = async (tx, data) => {
  return await tx.bloodTransfer.create({
    data,
  });
};

export const attachBloodUnitsRepository = async (
  tx,
  transferId,
  bloodUnitIds,
) => {
  return await tx.transferBloodUnit.createMany({
    data: bloodUnitIds.map((bloodUnitId) => ({
      transferId,
      bloodUnitId,
    })),
  });
};

export const reserveBloodUnitsRepository = async (tx, bloodUnitIds) => {
  return await tx.bloodUnit.updateMany({
    where: {
      id: {
        in: bloodUnitIds,
      },
    },
    data: {
      currentStatus: "RESERVED",
    },
  });
};

export const updateBloodRequestStatusRepository = async (
  tx,
  requestId,
  status,
) => {
  return await tx.bloodRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status,
    },
  });
};

export const getSentTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      sourceHospitalId: hospitalId,
    },
    include: {
      destinationHospital: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      bloodRequest: {
        select: {
          id: true,
          bloodGroup: true,
          unitsRequired: true,
          priority: true,
        },
      },
      bloodUnits: {
        include: {
          bloodUnit: {
            select: {
              id: true,
              bloodGroup: true,
              componentType: true,
              currentStatus: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReceivedTransfersRepository = async (hospitalId) => {
  return await prisma.bloodTransfer.findMany({
    where: {
      destinationHospitalId: hospitalId,
    },
    include: {
      sourceHospital: {
        select: {
          id: true,
          name: true,
          address: true,
          phoneNo: true,
        },
      },
      bloodRequest: {
        select: {
          id: true,
          bloodGroup: true,
          unitsRequired: true,
          priority: true,
        },
      },
      bloodUnits: {
        include: {
          bloodUnit: {
            select: {
              id: true,
              bloodGroup: true,
              componentType: true,
              volume: true,
              currentStatus: true,
              expirationDate: true,
            },
          },
        },
      },
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

export const updateTransferStatusRepository = async (
  tx,
  transferId,
  status,
) => {
  return await tx.bloodTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      status,
    },
  });
};

export const updateDispatchTimeRepository = async (tx, transferId) => {
  return await tx.bloodTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      dispatchedAt: new Date(),
    },
  });
};

export const updateReceivedTimeRepository = async (tx, transferId) => {
  return await tx.bloodTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      receivedAt: new Date(),
    },
  });
};

export const completeTransferRepository = async (tx, transferId) => {
  return await tx.bloodTransfer.update({
    where: {
      id: transferId,
    },
    data: {
      completedAt: new Date(),
    },
  });
};

export const markBloodUnitsTransferredRepository = async (tx, transferId) => {
  return await tx.bloodUnit.updateMany({
    where: {
      transfers: {
        some: {
          transferId,
        },
      },
    },
    data: {
      currentStatus: "AVAILABLE",
    },
  });
};
