import * as hospitalRepository from "./hospital.repository";
import { appError } from "../../../utils/appError.js";

export const getAllHopitalService = async () => {
  const hospitals = await hospitalRepository.findAllHospitals();
  return hospitals;
};

export const getHospitalByIdService = async (id) => {
  const hospital = await hospitalRepository.findHospitalById(id);
  return hospital;
};

export const updateHospitalService = async (id, data) => {
  const hospitalExists = await hospitalRepository.findHospitalById(id);

  if (!hospitalExists) {
    throw new appError("Hospital not found", 404);
  }

  const updatedHospital = await hospitalRepository.updateHospital(id, data);
  return updatedHospital;
};

export const searchHospitalService = async (query) => {
  const hospitals = await hospitalRepository.searchHospitals(query);
  return hospitals;
};
