import prisma from "../../db.js";

export const getHospitalInventoryRepository = async (hospitalId) => {
  return await prisma.bloodUnit.groupBy({
    by: ["bloodGroup"],
    where: {
      hospitalId,
      status: "AVAILABLE",
    },
    _count: {
      id: true,
    },
    orderBy: {
      bloodGroup: "asc",
    },
  });
};
