import * as BloodRequestRepository from "./bloodTransfer.repository.js";
import * as InventoryRepository from "../blood-units/inventory.repository.js";
import { prisma } from "../../db.js";
import allowedTransitions from "./bloodTransfer.transitions.js";

import AppError from "../../utils/appError.js";

export const createBloodTransferService = async (
  senderHospitalId,
  requestId,
) => {
  const bloodRequest =
    await BloodRequestRepository.findBloodRequestByIdRepository(requestId);

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.status !== "APPROVED") {
    throw new AppError(
      "Only approved blood requests can start a transfer",
      400,
    );
  }

  if (bloodRequest.approvedByHospitalId !== senderHospitalId) {
    throw new AppError(
      "Hospital is not authorized to start this transfer",
      403,
    );
  }

  const availableUnits = await InventoryRepository.getAvailableUnitsRepository(
    senderHospitalId,
    bloodRequest.bloodGroup,
  );

  if (availableUnits < bloodRequest.unitsRequested) {
    throw new AppError("Insufficient blood units available", 400);
  }

  return await BloodTransferRepository.createBloodTransferRepository({
    senderHospitalId,
    receiverHospitalId: bloodRequest.hospitalId,
    bloodRequestId: bloodRequest.id,
    status: "PENDING",
  });
};

export const getSentTransfersService = async (hospitalId) => {
  return await BloodTransferRepository.getSentTransfersRepository(hospitalId);
};

export const getReceivedTransfersService = async (hospitalId) => {
  return await BloodTransferRepository.getReceivedTransfersRepository(
    hospitalId,
  );
};

export const getTransferByIdService = async (hospitalId, transferId) => {
  const transfer = await BloodTransferRepository.findHospitalTransferRepository(
    hospitalId,
    transferId,
  );

  if (!transfer) {
    throw new AppError("Transfer not found or access denied", 404);
  }

  return transfer;
};

export const cancelTransferService = async (hospitalId, transferId) => {
  const transfer = await BloodTransferRepository.findHospitalTransferRepository(
    hospitalId,
    transferId,
  );

  if (!transfer) {
    throw new AppError("Transfer not found or access denied", 404);
  }

  if (transfer.status !== "PENDING") {
    throw new AppError("Only pending transfers can be cancelled", 400);
  }

  return await BloodTransferRepository.updateTransferStatusRepository(
    transferId,
    "CANCELLED",
  );
};

export const createBloodTransferService = async (
  sourceHospitalId,
  transferData,
) => {
  const { requestId, bloodUnitIds, notes } = transferData;

  return await prisma.$transaction(async (tx) => {
    const bloodRequest = await BloodRequestRepository.findBloodRequestById(
      tx,
      requestId,
    );

    const bloodUnits = await BloodRequestRepository.findBloodUnitsByIds(
      tx,
      bloodUnitIds,
    );

    // validations

    const transfer = await BloodRequestRepository.createBloodTransfer(tx, {
      requestId,
      sourceHospitalId,
      destinationHospitalId: bloodRequest.requestingHospitalId,
      unitsTransferred: bloodUnitIds.length,
      notes,
    });

    await BloodRequestRepository.attachBloodUnits(
      tx,
      transfer.id,
      bloodUnitIds,
    );

    await BloodRequestRepository.reserveBloodUnits(tx, bloodUnitIds);

    await BloodRequestRepository.updateBloodRequestStatus(
      tx,
      requestId,
      "TRANSFER_CREATED",
    );

    return transfer;
  });
};

export const getSentTransfersService = async (hospitalId) => {
  return await BloodTransferRepository.getSentTransfersRepository(hospitalId);
};

export const getReceivedTransfersService = async (hospitalId) => {
  return await BloodTransferRepository.getReceivedTransfersRepository(
    hospitalId,
  );
};

export const getTransferByIdService = async (hospitalId, transferId) => {
  const transfer = await BloodTransferRepository.findHospitalTransferRepository(
    hospitalId,
    transferId,
  );

  if (!transfer) {
    throw new AppError(
      "Transfer not found or you are not authorized to access it",
      404,
    );
  }

  return transfer;
};

export const updateTransferStatusService = async (
  hospitalId,
  transferId,
  newStatus,
) => {
  const transfer = await BloodTransferRepository.findHospitalTransferRepository(
    hospitalId,
    transferId,
  );

  if (!transfer) {
    throw new AppError("Transfer not found or not owned by hospital", 404);
  }

  const currentStatus = transfer.status;

  const allowed = allowedTransitions[currentStatus]?.includes(newStatus);

  if (!allowed) {
    throw new AppError(
      `Cannot change status from ${currentStatus} to ${newStatus}`,
      400,
    );
  }

  return await prisma.$transaction(async (tx) => {
    const updatedTransfer =
      await BloodTransferRepository.updateTransferStatusRepository(
        tx,
        transferId,
        newStatus,
      );

    if (newStatus === "DISPATCHED") {
      await BloodTransferRepository.updateDispatchTimeRepository(
        tx,
        transferId,
      );
    }

    if (newStatus === "RECEIVED") {
      await BloodTransferRepository.updateReceivedTimeRepository(
        tx,
        transferId,
      );
    }

    if (newStatus === "COMPLETED") {
      await BloodTransferRepository.completeTransferRepository(tx, transferId);

      await BloodTransferRepository.markBloodUnitsTransferredRepository(
        tx,
        transferId,
      );
    }

    return updatedTransfer;
  });
};
