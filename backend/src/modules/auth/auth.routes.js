import Router from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  // forgotPassword,
  // resetPassword,
  registerHospital,
  loginHospital,
  getCurrentHospital,
  changeHospitalPassword,
  forgotHospitalPassword,
  logoutHospital,
} from "./auth.controller.js";
import {
  registerUserSchema,
  loginUserSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  registerHospitalSchema,
  loginHospitalSchema,
} from "./auth.validator.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { verifyUser } from "./auth.middleware.js";
import { verifyHospital } from "../../middleware/authorize.js";

const router = Router();

// USER
router.post("/register", validateRequest(registerUserSchema), registerUser);

router.post("/login", validateRequest(loginUserSchema), loginUser);

router.post("/logout", logoutUser);

router.post("/refresh", refreshAccessToken);

router.get("/me", verifyUser, getCurrentUser);

router.patch(
  "/change-password",
  verifyUser,
  validateRequest(changePasswordSchema),
  changePassword,
);

// router.post(
//   "/forgot-password",
//   validateRequest(forgotPasswordSchema),
//   forgotPassword,
// );
// router.post("/reset-password", resetPassword);

// HOSPITAL
router.post(
  "/hospital-register",
  validateRequest(registerHospitalSchema),
  registerHospital,
);

router.post(
  "/hospital-login",
  validateRequest(loginHospitalSchema),
  loginHospital,
);

router.get("/hospital-me", verifyHospital, getCurrentHospital);

router.post("/hospital-logout", logoutHospital);

router.post("/hospitals/forgot-password", forgotHospitalPassword);

router.post(
  "/hospital/change-password",
  verifyHospital,
  changeHospitalPassword,
);

export default router;
