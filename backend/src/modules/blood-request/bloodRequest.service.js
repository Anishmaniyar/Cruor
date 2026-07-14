import AppError from "../../utils/appError.js";
import * as inventoryRepository from "../blood-units/inventory.repository.js";
import * as BloodRequestRepository from "./bloodRequest.repository.js";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";

export const createBloodRequestService = async (hospitalId, requestData) => {
  const { bloodGroup, unitsRequested } = requestData;

  const availableUnits = await inventoryRepository.getAvailableUnitsRepository(
    hospitalId,
    bloodGroup,
  );

  if (availableUnits >= unitsRequested) {
    throw new AppError("Hospital already has sufficient blood units", 400);
  }

  const pendingRequest = await BloodRequestRepository.findPendingRequest(
    hospitalId,
    bloodGroup,
  );

  if (pendingRequest) {
    throw new AppError(
      "A pending request already exists for this blood group",
      409,
    );
  }

  return await BloodRequestRepository.createBloodRequestRepository({
    hospitalId,
    ...requestData,
  });
};

export const getMyBloodRequestsService = async (hospitalId) => {
  return await BloodRequestRepository.getHospitalBloodRequestsRepository(
    hospitalId,
  );
};

export const getBloodRequestByIdService = async (hospitalId, requestId) => {
  const bloodRequest =
    await BloodRequestRepository.findHospitalBloodRequestRepository(
      hospitalId,
      requestId,
    );

  if (!bloodRequest) {
    throw new AppError("Blood request not found or access denied", 404);
  }

  return bloodRequest;
};

export const cancelBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest =
    await BloodRequestRepository.findHospitalBloodRequestRepository(
      hospitalId,
      requestId,
    );

  if (!bloodRequest) {
    throw new AppError("Blood request not found or access denied", 404);
  }

  if (bloodRequest.status !== "REQUESTED") {
    throw new AppError("Only pending requests can be cancelled", 400);
  }

  return await BloodRequestRepository.updateBloodRequestStatusRepository(
    requestId,
    "CANCELLED",
  );
};

export const approveBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest =
    await BloodRequestRepository.findBloodRequestByIdRepository(requestId);

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.status !== "REQUESTED") {
    throw new AppError("Only pending requests can be approved", 400);
  }

  if (bloodRequest.hospitalId === hospitalId) {
    throw new AppError("Hospital cannot approve its own blood request", 400);
  }

  const availableUnits = await inventoryRepository.getAvailableUnitsRepository(
    hospitalId,
    bloodRequest.bloodGroup,
  );

  if (availableUnits < bloodRequest.unitsRequested) {
    throw new AppError("Insufficient blood units available", 400);
  }

  await NotificationService.send({
    type: NotificationType.BLOOD_REQUEST_APPROVED,
    recipient: {
      hospitalId: hospitalId,
    },
    payload: {
      bloodGroup: bloodRequest.bloodGroup,
      unitsRequired: bloodRequest.unitsRequired,
      sourceHospitalName: bloodRequest.requestingHospitalId,
    },
  });
  return await BloodRequestRepository.updateBloodRequestStatusRepository(
    requestId,
    "APPROVED",
  );
};

export const rejectBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest =
    await BloodRequestRepository.findBloodRequestByIdRepository(requestId);

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.status !== "REQUESTED") {
    throw new AppError("Only pending requests can be rejected", 400);
  }

  if (bloodRequest.hospitalId === hospitalId) {
    throw new AppError("Hospital cannot reject its own blood request", 400);
  }

  await NotificationService.send({
    type: NotificationType.BLOOD_REQUEST_REJECTED,
    recipient: {
      hospitalId: hospitalId,
    },
    payload: {
      bloodGroup: bloodRequest.bloodGroup,
      unitsRequired: bloodRequest.unitsRequired,
      reason: "Insufficient inventory",
    },
  });

  return await BloodRequestRepository.updateBloodRequestStatusRepository(
    requestId,
    "REJECTED",
  );
};
