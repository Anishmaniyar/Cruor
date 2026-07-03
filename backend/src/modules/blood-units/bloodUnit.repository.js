import prisma from "../../db.js";

export const findBloodUnitsofHospital = async (hospitalId) => {
  return await prisma.bloodUnit.findMany({
    where: {
      hospitalId: hospitalId,
    },
    select: {
      bloodGroup: true,
      componentType: true,
      collectionDate: true,
      expirationDate: true,
      volume: true,
      storageLocation: true,
      currentStatus: true,
      donor: {
        select: {
          name: true, // Correctly nested select for relation
        },
      },
    },
  });
};

export const findBloodById = async (bloodUnitId) => {
  return await prisma.bloodUnit.findFirst({
    where: {
      id: bloodUnitId,
    },
  });
};

export const hospitalOwnedBloodUnitRepo = async (hospitalId, bloodUnitId) => {
  return await prisma.bloodUnit.findFirst({
    where: {
      id: bloodUnitId,
      hospitalId: hospitalId,
    },
    select: {
      bloodGroup: true,
      componentType: true,
      collectionDate: true,
      expirationDate: true,
      volume: true,
      storageLocation: true,
      currentStatus: true,
      donor: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const updateBloodUnitStatusRepo = async (bloodUnitId, newStatus) => {
  return await prisma.bloodUnit.update({
    where: {
      id: bloodUnitId,
    },
    data: {
      currentStatus: newStatus,
    },
  });
};

export const findBloodUnitByIdRepo = async (bloodUnitId, hospitalId) => {
  return await prisma.bloodUnit.findFirst({
    where: {
      id: bloodUnitId,
      hospitalId: hospitalId,
    },
  });
};
