import asyncHandler from "../../utils/asyncHandler.js";
import * as bloodRequestService from "./bloodRequest.service.js";

export const createBloodRequestData = asyncHandler(
  async (req, resizeBy, next) => {
    const hospitalId = req.hospital.id;
    const { requestData } = req.body;

    const bloodRequestData =
      await bloodRequestService.createBloodRequestService(
        hospitalId,
        requestData,
      );

    return res.status(200).json({
      status: "success",
      data: {
        bloodRequestData,
      },
      message: "Blood Request created successfully",
    });
  },
);

export const getMyBloodRequests = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const bloodRequests =
    await BloodRequestService.getMyBloodRequestsService(hospitalId);

  return res.status(200).json({
    status: "success",
    results: bloodRequests.length,
    data: bloodRequests,
  });
});

export const getBloodRequestById = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await BloodRequestService.getBloodRequestByIdService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
  });
});

export const cancelBloodRequest = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await BloodRequestService.cancelBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
    message: "Blood request cancelled successfully",
  });
});

export const approveBloodRequest = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await BloodRequestService.approveBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
    message: "Blood request approved successfully",
  });
});

export const rejectBloodRequest = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const requestId = req.params.id;

  const bloodRequest = await BloodRequestService.rejectBloodRequestService(
    hospitalId,
    requestId,
  );

  return res.status(200).json({
    status: "success",
    data: bloodRequest,
    message: "Blood request rejected successfully",
  });
});
