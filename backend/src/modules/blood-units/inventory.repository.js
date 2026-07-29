import prisma from "../../db.js";

export const getHospitalInventoryRepository = async (hospitalId) => {
  return await prisma.bloodUnit.groupBy({
    by: ["bloodGroup"],
    where: {
      hospitalId,
      currentStatus: "AVAILABLE",
    },
    _count: {
      id: true,
    },
    orderBy: {
      bloodGroup: "asc",
    },
  });
};

export const getAvailableUnitsRepository = async (hospitalId, bloodGroup) => {
  return await prisma.bloodUnit.count({
    where: {
      hospitalId,
      bloodGroup,
      currentStatus: "AVAILABLE",
    },
  });
};
