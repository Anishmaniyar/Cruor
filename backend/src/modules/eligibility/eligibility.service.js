import AppError from "../../utils/appError.js";
import {
  getUserData,
  getDonationData,
  findUserById,
  createHealthScreeningRepository,
} from "./eligibility.repository.js";
import { evaluateScreeningRules } from "./eligibility.rules.js";

export const checkEligibilityService = async (userId) => {
  const userData = await getUserData(userId);

  if (!userData) {
    throw new AppError("User data not found", 404);
  }

  const donationData = await getDonationData(userId);

  if (!donationData) {
    return {
      eligible: true,
      nextEligibleDate: null,
      reasons: [],
    };
  }

  const donationIntervals = {
    WHOLE_BLOOD: 90,
    PLASMA: 28,
    PLATELETS: 14,
    DOUBLE_RED_CELLS: 112,
  };

  const componentType = donationData.bloodUnits[0]?.componentType;

  const interval = donationIntervals[componentType] ?? 90;

  const lastDonationDate = new Date(donationData.donationDate);

  const nextEligibleDate = new Date(lastDonationDate);

  nextEligibleDate.setDate(nextEligibleDate.getDate() + interval);

  const today = new Date();

  if (today < nextEligibleDate) {
    return {
      eligible: false,
      nextEligibleDate,
      reasons: [
        `You can donate again after ${nextEligibleDate.toDateString()}.`,
      ],
    };
  }

  return {
    eligible: true,
    nextEligibleDate: null,
    reasons: [],
  };
};

export const submitScreeningService = async (userId, screeningData) => {
  const userExists = await findUserById(userId);

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  const screeningResult = evaluateScreeningRules(screeningData);

  await createHealthScreeningRepository({
    userId,
    ...screeningData,
    eligible: screeningResult.eligible,
  });

  return screeningResult;
};
