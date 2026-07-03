import asyncHandler from "../../utils/asyncHandler.js";
import * as bloodUnitService from "./bloodUnit.service.js";
import * as inventoryService from "./inventory.service.js"

export const blooodUnitofHospital = asyncHandler(
  async (req, resizeBy, next) => {
    const hospitalId = req.hospital.id;

    const bloodUnit =
      await bloodUnitService.getBloodUnitofHospitalService(hospitalId);

    return res.status(200).json({
        status: "success",
        data: {
            totalBloodUnits = bloodUnit.length,
            bloodUnit
        },
        message: "Blood units fetched successfully"
    })
  },

);

export const bloodUnitInventory = asyncHandler(async (req, res, next) => {
    const hospitalId = req.hospital.id;

    const inventoryData = await inventoryService.getHospitalInventoryService(hospitalId)

    return res.status(200).json({
        status: "success",
        data: {
            inventoryData
        },
        message: "Blood units data fetched successfully"
    })
})

export const bloodUnitInventorybyId = asyncHandler(async (req, res, next) => {
    const hospitalId = req.hospital.id;

    const bloodUnitId = req.params.id;

    const bloodUnitData = await bloodUnitService.getbloodUnitByIdService(bloodUnitId, hospitalId)

    return res.status(200).json({
        status: "success",
        data: {
            bloodUnitData
        },
        message: "Blood units data fetched successfully"
    })
})

export const updateBloodUnitPacketStatus = asyncHandler(async (req, res, next) => {
    const hospitalId = req.hospital.id;
    
    const bloodUnitId = req.params.id;

    const {newStatus} = req.body

    const updateStatus = await bloodUnitService.updateBloodUnitService(hospitalId, bloodUnitId, newStatus)

    return res.status(204).json({
        status: "success",
        message: "Status updated successfully"
    })
})

export const expireBloodUnitPacketStatus = asyncHandler(async (req, res, next) => {
    const hospitalId = req.hospital.id;

    const bloodUnitId = req.params.id;

    const {status} = req.body;

    const expireBloodUnit = await bloodUnitService.expireBloodUnitService(hospitalId, bloodUnitId, newStatus)

    return res.status(204).json({
        status: "success",
        message: "Status updated successfully"
    })
})