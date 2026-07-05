import prisma from "../../db.js";

export const findPendingRequest = async (hospitalId, bloodGroup) => {
  return await prisma.bloodRequest.findFirst({
    where: {
      hospitalId,
      bloodGroup,
      status: "REQUESTED",
    },
  });
};

export const createBloodRequestRepository = async (data) => {
  return await prisma.bloodRequest.create({
    data,
  });
};

export const getHospitalBloodRequestsRepository = async (hospitalId) => {
  return await prisma.bloodRequest.findMany({
    where: {
      hospitalId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findHospitalBloodRequestRepository = async (
  hospitalId,
  requestId,
) => {
  return await prisma.bloodRequest.findFirst({
    where: {
      id: requestId,
      hospitalId,
    },
  });
};

export const updateBloodRequestStatusRepository = async (requestId, status) => {
  return await prisma.bloodRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status,
    },
  });
};

export const findBloodRequestByIdRepository = async (requestId) => {
  return await prisma.bloodRequest.findUnique({
    where: {
      id: requestId,
    },
  });
};
