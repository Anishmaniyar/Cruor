import prisma from "../../db.js";

export const createResponseRepo = async (data) => {
  return await prisma.bloodRequestResponse.create({ data });
};

export const findResponseByIdRepo = async (id) => {
  return await prisma.bloodRequestResponse.findUnique({
    where: { id },
    include: {
      bloodRequest: true,
      respondingHospital: {
        select: { id: true, name: true },
      },
    },
  });
};

export const findMyResponseRepo = async (requestId, hospitalId) => {
  return await prisma.bloodRequestResponse.findUnique({
    where: {
      bloodRequestId_respondingHospitalId: {
        bloodRequestId: requestId,
        respondingHospitalId: hospitalId,
      },
    },
  });
};

export const findRequestResponsesRepo = async (requestId) => {
  return await prisma.bloodRequestResponse.findMany({
    where: { bloodRequestId: requestId },
    include: {
      respondingHospital: {
        select: { id: true, name: true, address: true, phoneNo: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateResponseStatusRepo = async (id, status) => {
  return await prisma.bloodRequestResponse.update({
    where: { id },
    data: { status },
  });
};

export const updateResponseStatusTxRepo = async (tx, id, status) => {
  return await tx.bloodRequestResponse.update({
    where: { id },
    data: { status },
  });
};

export const declineOtherAcceptedResponsesTxRepo = async (tx, requestId, excludeResponseId) => {
  return await tx.bloodRequestResponse.updateMany({
    where: {
      bloodRequestId: requestId,
      status: "ACCEPTED",
      id: { not: excludeResponseId },
    },
    data: { status: "DECLINED" },
  });
};

export const countAcceptedResponsesRepo = async (requestId) => {
  return await prisma.bloodRequestResponse.count({
    where: {
      bloodRequestId: requestId,
      status: "ACCEPTED",
    },
  });
};

export const countRejectedResponsesRepo = async (requestId) => {
  return await prisma.bloodRequestResponse.count({
    where: {
      bloodRequestId: requestId,
      status: "REJECTED",
    },
  });
};

export const countTotalResponsesRepo = async (requestId) => {
  return await prisma.bloodRequestResponse.count({
    where: { bloodRequestId: requestId },
  });
};

export const createResponseTxRepo = async (tx, data) => {
  return await tx.bloodRequestResponse.create({ data });
};

export const declineAllAcceptedResponsesTxRepo = async (tx, requestId) => {
  return await tx.bloodRequestResponse.updateMany({
    where: {
      bloodRequestId: requestId,
      status: "ACCEPTED",
    },
    data: { status: "DECLINED" },
  });
};

export const findResponseByIdTxRepo = async (tx, id) => {
  return await tx.bloodRequestResponse.findUnique({
    where: { id },
  });
};

export const declineOtherAcceptedTxRepo = async (tx, requestId, excludeResponseId) => {
  return await tx.bloodRequestResponse.updateMany({
    where: {
      bloodRequestId: requestId,
      status: "ACCEPTED",
      id: { not: excludeResponseId },
    },
    data: { status: "DECLINED" },
  });
};

export const getResponsesCountsTxRepo = async (tx, requestId) => {
  const [total, accepted, rejected] = await Promise.all([
    tx.bloodRequestResponse.count({ where: { bloodRequestId: requestId } }),
    tx.bloodRequestResponse.count({
      where: { bloodRequestId: requestId, status: "ACCEPTED" },
    }),
    tx.bloodRequestResponse.count({
      where: { bloodRequestId: requestId, status: "REJECTED" },
    }),
  ]);
  return { total, accepted, rejected };
};
