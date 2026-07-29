import AppError from "../../utils/appError.js";
import prisma from "../../db.js";
import * as BloodRequestRepository from "./bloodRequest.repository.js";
import * as BloodRequestResponseRepository from "./bloodRequestResponse.repository.js";
import * as inventoryRepository from "../blood-units/inventory.repository.js";
import * as NotificationService from "../notifications/notification.service.js";
import { NotificationType } from "../notifications/notification.constants.js";

// ─────────────────────────────────────────────
//  Blood Request CRUD
// ─────────────────────────────────────────────

export const createBloodRequestService = async (hospitalId, data) => {
  const { bloodGroup, unitsRequired } = data;

  const availableUnits = await inventoryRepository.getAvailableUnitsRepository(
    hospitalId,
    bloodGroup,
  );

  if (availableUnits >= unitsRequired) {
    throw new AppError("Hospital already has sufficient blood units", 400);
  }

  const existingRequest =
    await BloodRequestRepository.findOpenRequestForBloodGroupRepo(
      hospitalId,
      bloodGroup,
    );

  if (existingRequest) {
    throw new AppError(
      "An open request already exists for this blood group",
      409,
    );
  }

  return await BloodRequestRepository.createBloodRequestRepo({
    requestingHospitalId: hospitalId,
    bloodGroup,
    unitsRequired,
    priority: data.priority,
    reason: data.reason,
    status: "OPEN",
  });
};

export const getMyRequestsService = async (hospitalId) => {
  return await BloodRequestRepository.findMyRequestsRepo(hospitalId);
};

export const getAvailableRequestsService = async (hospitalId) => {
  return await BloodRequestRepository.findAvailableRequestsRepo(hospitalId);
};

export const getRequestByIdService = async (hospitalId, requestId) => {
  const bloodRequest =
    await BloodRequestRepository.findRequestByIdWithResponsesRepo(requestId);

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.requestingHospitalId !== hospitalId) {
    const myResponse = bloodRequest.responses.find(
      (r) => r.respondingHospitalId === hospitalId,
    );
    bloodRequest.responses = myResponse ? [myResponse] : [];
  }

  return bloodRequest;
};

export const getRequestResponsesService = async (hospitalId, requestId) => {
  const bloodRequest = await BloodRequestRepository.findRequestByIdRepo(
    requestId,
  );

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.requestingHospitalId !== hospitalId) {
    throw new AppError(
      "Only the requesting hospital can view all responses",
      403,
    );
  }

  return await BloodRequestResponseRepository.findRequestResponsesRepo(
    requestId,
  );
};

export const getMyResponseService = async (hospitalId, requestId) => {
  const response = await BloodRequestResponseRepository.findMyResponseRepo(
    requestId,
    hospitalId,
  );

  if (!response) {
    throw new AppError("You have not responded to this request yet", 404);
  }

  return response;
};

// ─────────────────────────────────────────────
//  Respond to a Request
// ─────────────────────────────────────────────

export const acceptBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest = await BloodRequestRepository.findRequestByIdRepo(
    requestId,
  );

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.status !== "OPEN") {
    throw new AppError("This request is no longer open for responses", 400);
  }

  if (bloodRequest.requestingHospitalId === hospitalId) {
    throw new AppError("You cannot respond to your own request", 400);
  }

  const existingResponse =
    await BloodRequestResponseRepository.findMyResponseRepo(
      requestId,
      hospitalId,
    );

  if (existingResponse) {
    throw new AppError("You have already responded to this request", 409);
  }

  const availableUnits = await inventoryRepository.getAvailableUnitsRepository(
    hospitalId,
    bloodRequest.bloodGroup,
  );

  if (availableUnits < bloodRequest.unitsRequired) {
    throw new AppError(
      "Insufficient blood units available to fulfill this request",
      400,
    );
  }

  const response = await BloodRequestResponseRepository.createResponseRepo({
    bloodRequestId: requestId,
    respondingHospitalId: hospitalId,
    status: "ACCEPTED",
  });

  await NotificationService.send({
    type: NotificationType.BLOOD_REQUEST_ACCEPTED,
    recipient: { hospitalId: bloodRequest.requestingHospitalId },
    payload: {
      bloodGroup: bloodRequest.bloodGroup,
      unitsRequired: bloodRequest.unitsRequired,
      respondingHospitalId: hospitalId,
    },
  });

  return response;
};

export const rejectBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest = await BloodRequestRepository.findRequestByIdRepo(
    requestId,
  );

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.status !== "OPEN") {
    throw new AppError("This request is no longer open for responses", 400);
  }

  if (bloodRequest.requestingHospitalId === hospitalId) {
    throw new AppError("You cannot respond to your own request", 400);
  }

  const existingResponse =
    await BloodRequestResponseRepository.findMyResponseRepo(
      requestId,
      hospitalId,
    );

  if (existingResponse) {
    throw new AppError("You have already responded to this request", 409);
  }

  const response = await prisma.$transaction(async (tx) => {
    const resp = await BloodRequestResponseRepository.createResponseTxRepo(
      tx,
      {
        bloodRequestId: requestId,
        respondingHospitalId: hospitalId,
        status: "REJECTED",
      },
    );

    // Check if ALL responses are now REJECTED (none ACCEPTED)
    const counts =
      await BloodRequestResponseRepository.getResponsesCountsTxRepo(
        tx,
        requestId,
      );

    // Auto-FAIL if every response is REJECTED
    if (
      counts.total > 0 &&
      counts.accepted === 0 &&
      counts.rejected === counts.total
    ) {
      await BloodRequestRepository.failRequestTxRepo(tx, requestId);
    }

    return resp;
  });

  // Notify AFTER the transaction commits
  await NotificationService.send({
    type: NotificationType.BLOOD_REQUEST_REJECTED,
    recipient: { hospitalId: bloodRequest.requestingHospitalId },
    payload: {
      bloodGroup: bloodRequest.bloodGroup,
      unitsRequired: bloodRequest.unitsRequired,
      reason: "Insufficient inventory or unable to fulfill",
    },
  });

  return response;
};

// ─────────────────────────────────────────────
//  Cancel a Request
// ─────────────────────────────────────────────

export const cancelBloodRequestService = async (hospitalId, requestId) => {
  const bloodRequest = await BloodRequestRepository.findRequestByIdRepo(
    requestId,
  );

  if (!bloodRequest) {
    throw new AppError("Blood request not found", 404);
  }

  if (bloodRequest.requestingHospitalId !== hospitalId) {
    throw new AppError("You can only cancel your own requests", 403);
  }

  if (bloodRequest.status !== "OPEN") {
    throw new AppError("Only open requests can be cancelled", 400);
  }

  const updated = await prisma.$transaction(async (tx) => {
    // Decline all ACCEPTED responses so those hospitals see the change
    await BloodRequestResponseRepository.declineAllAcceptedResponsesTxRepo(
      tx,
      requestId,
    );

    return await BloodRequestRepository.updateRequestStatusTxRepo(
      tx,
      requestId,
      "CANCELLED",
    );
  });

  // Notify the requesting hospital after successful cancellation
  await NotificationService.send({
    type: NotificationType.BLOOD_REQUEST_CANCELLED,
    recipient: { hospitalId },
    payload: {
      bloodGroup: bloodRequest.bloodGroup,
      unitsRequired: bloodRequest.unitsRequired,
    },
  });

  return updated;
};

// ─────────────────────────────────────────────
//  Select an Offer
// ─────────────────────────────────────────────

export const selectOfferService = async (hospitalId, requestId, responseId) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify the request is OPEN and belongs to this hospital
    const bloodRequest = await BloodRequestRepository.findRequestByIdTxRepo(
      tx,
      requestId,
    );

    if (!bloodRequest) {
      throw new AppError("Blood request not found", 404);
    }

    if (bloodRequest.requestingHospitalId !== hospitalId) {
      throw new AppError(
        "You can only select offers for your own requests",
        403,
      );
    }

    if (bloodRequest.status !== "OPEN") {
      throw new AppError("This request is no longer open", 400);
    }

    // 2. Verify the response exists, belongs to this request, and is ACCEPTED
    const response =
      await BloodRequestResponseRepository.findResponseByIdTxRepo(tx, responseId);

    if (!response || response.bloodRequestId !== requestId) {
      throw new AppError("Response not found for this request", 404);
    }

    if (response.status !== "ACCEPTED") {
      throw new AppError("Only ACCEPTED responses can be selected", 400);
    }

    // 3. Verify the responding hospital still has enough available units
    const availableUnits =
      await BloodRequestRepository.countAvailableUnitsTxRepo(
        tx,
        response.respondingHospitalId,
        bloodRequest.bloodGroup,
      );

    if (availableUnits < bloodRequest.unitsRequired) {
      throw new AppError(
        "Responding hospital no longer has sufficient blood units available",
        400,
      );
    }

    // 4. Reserve the blood units
    const unitsToReserve =
      await BloodRequestRepository.findAndReserveUnitsTxRepo(
        tx,
        response.respondingHospitalId,
        bloodRequest.bloodGroup,
        bloodRequest.unitsRequired,
      );

    if (!unitsToReserve) {
      throw new AppError(
        "Could not reserve the required number of blood units",
        500,
      );
    }

    // 5. Create a BloodTransfer record
    const transfer = await BloodRequestRepository.createBloodTransferTxRepo(
      tx,
      {
        requestId,
        sourceHospitalId: response.respondingHospitalId,
        destinationHospitalId: hospitalId,
        unitsTransferred: bloodRequest.unitsRequired,
        status: "PENDING",
      },
    );

    // 6. Link the reserved units to the transfer
    await BloodRequestRepository.linkUnitsToTransferTxRepo(
      tx,
      transfer.id,
      unitsToReserve.map((u) => u.id),
    );

    // 7. Decline all OTHER ACCEPTED responses
    await BloodRequestResponseRepository.declineOtherAcceptedTxRepo(
      tx,
      requestId,
      responseId,
    );

    // 8. Mark the request as FULFILLED (optimistic lock: only if still OPEN)
    try {
      await BloodRequestRepository.fulfillRequestTxRepo(tx, requestId);
    } catch {
      // Prisma throws P2025 when update finds no matching record
      // (the status was changed by another concurrent admin)
      throw new AppError(
        "Request was already fulfilled or cancelled by another admin",
        409,
      );
    }

    // 9. Notify the selected hospital
    await NotificationService.send({
      type: NotificationType.BLOOD_REQUEST_OFFER_SELECTED,
      recipient: { hospitalId: response.respondingHospitalId },
      payload: {
        bloodGroup: bloodRequest.bloodGroup,
        unitsRequired: bloodRequest.unitsRequired,
        requestingHospitalId: hospitalId,
        transferId: transfer.id,
      },
    });

    return { response, transfer };
  });
};
