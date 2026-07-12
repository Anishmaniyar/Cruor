import prisma from "../../db.js";

export const findAllHospitals = async () => {
  return await prisma.hospital.findMany();
};

export const findHospitalById = async (id) => {
  return await prisma.hospital.findUnique({
    where: { id: id },
  });
};

export const searchHospitals = async (query) => {
  return await prisma.hospital.findMany({
    where: {
      OR: [{ name: { contains: query } }, ,],
    },
  });
};

export const updateHospital = async (id, data) => {
  return await prisma.hospital.update({
    where: { id: id },
    data: data,
  });
};
