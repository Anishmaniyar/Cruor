import * as BloodRequestRepository from "./bloodTransfer.repository.js";
import * as InventoryRepository from "../blood-units/inventory.repository.js";

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
