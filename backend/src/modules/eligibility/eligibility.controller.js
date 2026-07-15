import asyncHandler from "../../utils/asyncHandler.js";
import {
  checkEligibilityService,
  submitScreeningService,
} from "./eligibility.service.js";

export const checkEligibility = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const response = await checkEligibilityService(userId);

  return res.status(200).json({
    status: "success",
    message: "User eligiblity data fetched successfully",
    data: response,
  });
});

export const healthScreening = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const screeningData = req.body;

  const response = await EligibilityService.submitScreeningService(
    userId,
    screeningData,
  );

  return res.status(200).json({
    status: "success",
    message: "User health screening fetched successfully",
    data: response,
  });
});
