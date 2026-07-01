import appError from "../../../utils/appError.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import * as hospitalService from "./hospital.service.js";

export const getHospitals = asyncHandler(async (req, res, next) => {
  const hospitals = await hospitalService.getAllHopitalService();

  return res.status(200).json({
    status: "success",
    results: hospitals.length,
    data: {
      hospitals,
    },
  });
});

export const getHospitalId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const hospital = await hospitalService.getHospitalByIdService(id);

  return res.status(200).json({
    status: "success",
    data: {
      hospital,
      message: "Hospital found successfully",
    },
  });
});

export const updateHospital = asyncHandler(async (req, res, next) => {
  const { email, name, phoneNo } = req.body;
  const id = req.params.id;

  const hospital = await hospitalService.updateHospitalService(id, {
    email,
    name,
    phoneNo,
  });

  return res.status(200).json({
    status: "success",
    data: {
      hospital,
      message: "Hospital updated successfully",
    },
  });
});

// based on only name for now no city and other filters like paginationa and filtering also to add area wise search feature later
export const searchHospital = asyncHandler(async (req, res, next) => {
  const query = req.query;

  const hospitals = await hospitalService.searchHospitalService(query);

  return res.status(200).json({
    status: "success",
    data: {
      hospitals,
      message: "Hospitals found successfully",
    },
  });
});
