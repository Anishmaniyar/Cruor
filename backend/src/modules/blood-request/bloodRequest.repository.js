import prisma from "../../db.js";

export const createBloodRequestRepo = async (data) => {
  return await prisma.bloodRequest.create({ data });
};

export const findRequestByIdRepo = async (id) => {
  return await prisma.bloodRequest.findUnique({ where: { id } });
};

export const findMyRequestsRepo = async (hospitalId) => {
  return await prisma.bloodRequest.findMany({
    where: { requestingHospitalId: hospitalId },
    include: {
      responses: {
        include: {
          respondingHospital: {
            select: { id: true, name: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const findAvailableRequestsRepo = async (hospitalId) => {
  return await prisma.bloodRequest.findMany({
    where: {
      requestingHospitalId: { not: hospitalId },
      status: "OPEN",
    },
    include: {
      requestingHospital: {
        select: { id: true, name: true, address: true },
      },
      responses: {
        where: { respondingHospitalId: hospitalId },
        select: { id: true, status: true },
      },
    },
    orderBy: [
      { priority: "desc" },
      { createdAt: "desc" },
    ],
  });
};

export const findOpenRequestForBloodGroupRepo = async (hospitalId, bloodGroup) => {
  return await prisma.bloodRequest.findFirst({
    where: {
      requestingHospitalId: hospitalId,
      bloodGroup,
      status: "OPEN",
    },
  });
};

export const updateRequestStatusRepo = async (id, status) => {
  return await prisma.bloodRequest.update({
    where: { id },
    data: { status },
  });
};

export const updateRequestStatusTxRepo = async (tx, id, status) => {
  return await tx.bloodRequest.update({
    where: { id, status: "OPEN" },
    data: { status },
  });
};

export const findRequestByIdWithResponsesRepo = async (id) => {
  return await prisma.bloodRequest.findUnique({
    where: { id },
    include: {
      requestingHospital: {
        select: { id: true, name: true },
      },
      responses: {
        include: {
          respondingHospital: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
};

export const findRequestByIdTxRepo = async (tx, id) => {
  return await tx.bloodRequest.findUnique({ where: { id } });
};

export const failRequestTxRepo = async (tx, id) => {
  return await tx.bloodRequest.update({
    where: { id },
    data: { status: "FAILED" },
  });
};

export const countAvailableUnitsTxRepo = async (tx, hospitalId, bloodGroup) => {
  return await tx.bloodUnit.count({
    where: {
      hospitalId,
      bloodGroup,
      currentStatus: "AVAILABLE",
    },
  });
};

export const findAndReserveUnitsTxRepo = async (tx, hospitalId, bloodGroup, count) => {
  const units = await tx.bloodUnit.findMany({
    where: {
      hospitalId,
      bloodGroup,
      currentStatus: "AVAILABLE",
    },
    take: count,
  });

  if (units.length < count) {
    return null;
  }

  await tx.bloodUnit.updateMany({
    where: {
      id: { in: units.map((u) => u.id) },
    },
    data: { currentStatus: "RESERVED" },
  });

  return units;
};

export const createBloodTransferTxRepo = async (tx, data) => {
  return await tx.bloodTransfer.create({ data });
};

export const linkUnitsToTransferTxRepo = async (tx, transferId, bloodUnitIds) => {
  return await tx.transferBloodUnit.createMany({
    data: bloodUnitIds.map((bloodUnitId) => ({
      transferId,
      bloodUnitId,
    })),
  });
};

export const fulfillRequestTxRepo = async (tx, id) => {
  // Optimistic lock: only succeeds if status is still OPEN
  return await tx.bloodRequest.update({
    where: { id, status: "OPEN" },
    data: { status: "FULFILLED" },
  });
};
