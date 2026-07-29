import asyncHandler from "../../utils/asyncHandler.js";
import * as bloodRequestService from "./bloodRequest.service.js";

// ─────────────────────────────────────────────
//  Blood Request CRUD
// ─────────────────────────────────────────────

export const createBloodRequestData = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const bloodRequestData = await bloodRequestService.createBloodRequestService(
    hospitalId,
    req.body,
  );

  return res.status(201).json({
    status: "success",
    data: { bloodRequestData },
    message: "Blood request created successfully",
  });
});

export const getMyRequests = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const bloodRequests = await bloodRequestService.getMyRequestsService(
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    results: bloodRequests.length,
    data: bloodRequests,
  });
});

export const getAvailableRequests = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const bloodRequests =
    await bloodRequestService.getAvailableRequestsService(hospitalId);

  return res.status(200).json({
    status: "success",
    results: bloodRequests.length,
    data: bloodRequests,
  });
});

export const getBloodRequestById = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await bloodRequestService.getRequestByIdService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
  });
});

export const getRequestResponses = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const responses = await bloodRequestService.getRequestResponsesService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    results: responses.length,
    data: responses,
  });
});

export const getMyResponse = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const response = await bloodRequestService.getMyResponseService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: response,
  });
});

// ─────────────────────────────────────────────
//  Actions (Accept, Reject, Cancel, Select Offer)
// ─────────────────────────────────────────────

export const acceptBloodRequest = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const response = await bloodRequestService.acceptBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: response,
    message: "Blood request accepted successfully",
  });
});

export const rejectBloodRequest = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const response = await bloodRequestService.rejectBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: response,
    message: "Blood request rejected",
  });
});

export const cancelBloodRequest = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await bloodRequestService.cancelBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
    message: "Blood request cancelled successfully",
  });
});

export const selectOffer = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;
  const { id: requestId, responseId } = req.params;

  const result = await bloodRequestService.selectOfferService(
    hospitalId,
    requestId,
    responseId,
  );

  return res.status(200).json({
    status: "success",
    data: result,
    message: "Offer selected successfully. Blood transfer initiated.",
  });
});
