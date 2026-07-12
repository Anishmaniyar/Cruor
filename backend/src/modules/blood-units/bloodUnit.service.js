import * as bloodUnitRepository from "./bloodUnit.repository.js";
import AppError from "../../utils/appError.js";
import { allowedTransitions } from "./bloodUnit.transitions.js";

export const getbloodUnitofHospitalService = async (hospitalId) => {
  const bloodUnits =
    await bloodUnitRepository.findBloodUnitsofHospital(hospitalId);

  return bloodUnits;
};

export const getbloodUnitByIdService = async (bloodUnitId, hospitalId) => {
  const bloodUnitExists = await bloodUnitRepository.bloodUnitById(bloodUnitId);

  if (!bloodUnitExists) {
    throw new AppError("Blood Unit packet does not exists", 404);
  }

  const hospitalOwnsBloodUnit =
    await bloodUnitRepository.hospitalOwnedBloodUnitRpo(
      hospitalId,
      bloodUnitId,
    );

  return hospitalOwnsBloodUnit;
};

export const updateBloodUnitService = async (
  hospitalId,
  bloodUnitId,
  newStatus,
) => {
  const bloodUnitExists = await bloodUnitRepository.hospitalOwnedBloodUnitRepo(
    hospitalId,
    bloodUnitId,
  );

  if (!bloodUnitExists) {
    throw new AppError(
      "Blood Unit is not found or not owned by the hospital",
      404,
    );
  }

  const currentStatus = bloodUnitExists.currentStatus;

  const allowedNextStates = allowedTransition[currentStatus];

  if (!allowedNextStates.includes(newStatus)) {
    throw new AppError(
      `Cannot change blood unit from ${currentStatus} to ${newStatus}`,
      400,
    );
  }

  return await bloodUnitRepository.updateBloodUnitStatusRepo(
    bloodUnitId,
    newStatus,
  );
};

export const expireBloodUnitService = async (
  hospitalId,
  bloodUnitId,
  newStatus,
) => {
  const bloodUnitExists = await bloodUnitRepository.hospitalOwnedBloodUnitRepo(
    hospitalId,
    bloodUnitId,
  );

  if (!bloodUnitExists) {
    throw new AppError(
      "Blood Unit is not found or not owned by the hospital",
      404,
    );
  }

  const currentStatus = bloodUnitExists.currentStatus;

  if (currentStatus == "EXPIRED") {
    throw new AppError("Blood unit is already expired");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiryDate = new Date(bloodUnit.expirationDate);
  expiryDate.setHours(0, 0, 0, 0);

  if (!(expiryDate <= today)) {
    throw new AppError(
      "Cannot mark as expired. This blood unit packet has not reached its expiration date.",
      400,
    );
  }

  const updatedUnit = await BloodUnitRepository.updateBloodUnitStatusRepo(
    bloodUnitId,
    "EXPIRED",
  );

  return updatedUnit;
};
