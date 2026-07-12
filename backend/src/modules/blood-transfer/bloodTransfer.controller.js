import { asyncHandler } from "../../utils/asyncHandler.js";
import * as BloodTransferService from "./bloodTransfer.service.js";

export const createBloodTransfer = asyncHandler(async (req, res) => {
  const senderHospitalId = req.hospital.id;
  const requestId = req.params.requestId;

  const transfer = await BloodTransferService.createBloodTransferService(
    senderHospitalId,
    requestId,
  );

  return res.status(201).json({
    status: "success",
    data: transfer,
    message: "Blood transfer created successfully",
  });
});

export const getSentTransfers = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const transfers =
    await BloodTransferService.getSentTransfersService(hospitalId);

  return res.status(200).json({
    status: "success",
    results: transfers.length,
    data: transfers,
  });
});

export const getReceivedTransfers = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const transfers =
    await BloodTransferService.getReceivedTransfersService(hospitalId);

  return res.status(200).json({
    status: "success",
    results: transfers.length,
    data: transfers,
  });
});

export const getTransferById = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const transferId = req.params.id;

  const transfer = await BloodTransferService.getTransferByIdService(
    hospitalId,
    transferId,
  );

  return res.status(200).json({
    status: "success",
    data: transfer,
  });
});

export const cancelTransfer = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const transferId = req.params.id;

  const transfer = await BloodTransferService.cancelTransferService(
    hospitalId,
    transferId,
  );

  return res.status(200).json({
    status: "success",
    data: transfer,
    message: "Transfer cancelled successfully",
  });
});

export const createBloodTransferController = asyncHandler(async (req, res) => {
  const sourceHospitalId = req.hospital.id;
  const transferData = req.validatedData;

  const transfer = await BloodTransferService.createBloodTransferService(
    sourceHospitalId,
    transferData,
  );

  return res.status(201).json({
    status: "success",
    data: transfer,
    message: "Blood transfer created successfully",
  });
});

export const getSentTransfersController = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const transfers =
    await BloodTransferService.getSentTransfersService(hospitalId);

  return res.status(200).json({
    status: "success",
    data: transfers,
    message: "Sent transfers fetched successfully",
  });
});

export const getReceivedTransfersController = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;

  const transfers =
    await BloodTransferService.getReceivedTransfersService(hospitalId);

  return res.status(200).json({
    status: "success",
    data: transfers,
    message: "Received transfers fetched successfully",
  });
});

export const getTransferByIdController = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const { id: transferId } = req.params;

  const transfer = await BloodTransferService.getTransferByIdService(
    hospitalId,
    transferId,
  );

  return res.status(200).json({
    status: "success",
    data: transfer,
    message: "Transfer fetched successfully",
  });
});

export const updateTransferStatusController = asyncHandler(async (req, res) => {
  const hospitalId = req.hospital.id;
  const { id: transferId } = req.params;
  const { status } = req.validatedData;

  const transfer = await BloodTransferService.updateTransferStatusService(
    hospitalId,
    transferId,
    status,
  );

  return res.status(200).json({
    status: "success",
    data: transfer,
    message: "Transfer status updated successfully",
  });
});
