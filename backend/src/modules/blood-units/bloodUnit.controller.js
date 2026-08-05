import asyncHandler from "../../utils/asyncHandler.js";
import * as bloodUnitService from "./bloodUnit.service.js";
import * as inventoryService from "./inventory.service.js";

export const blooodUnitofHospital = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const bloodUnit =
    await bloodUnitService.getbloodUnitofHospitalService(hospitalId);

  return res.status(200).json({
    status: "success",
    totalBloodUnits: bloodUnit.length, // Fixed with ':'
    data: {
      bloodUnit,
    },
  });
});

export const bloodUnitInventory = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const inventoryData =
    await inventoryService.getHospitalInventoryService(hospitalId);

  return res.status(200).json({
    status: "success",
    data: {
      inventoryData,
    },
    message: "Blood units data fetched successfully",
  });
});

export const bloodUnitInventorybyId = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const bloodUnitId = req.params.id;

  const bloodUnitData = await bloodUnitService.getbloodUnitByIdService(
    bloodUnitId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    data: {
      bloodUnitData,
    },
    message: "Blood units data fetched successfully",
  });
});

export const updateBloodUnitPacketStatus = asyncHandler(
  async (req, res, next) => {
    const hospitalId = req.hospital.id;

    const bloodUnitId = req.params.id;

    const { newStatus } = req.body;

    const updateStatus = await bloodUnitService.updateBloodUnitService(
      hospitalId,
      bloodUnitId,
      newStatus,
    );

    return res.status(200).json({
      status: "success",
      message: "Status updated successfully",
      data: updateStatus,
    });
  },
);

export const expireBloodUnitPacketStatus = asyncHandler(
  async (req, res, next) => {
    const hospitalId = req.hospital.id;

    const bloodUnitId = req.params.id;

    const expireBloodUnit = await bloodUnitService.expireBloodUnitService(
      hospitalId,
      bloodUnitId,
    );

    return res.status(200).json({
      status: "success",
      message: "Blood unit expired successfully",
      data: expireBloodUnit,
    });
  },
);
