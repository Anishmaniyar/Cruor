import Router from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
  registerHospital,
  loginHospital,
  getCurrentHospital,
  changeHospitalPassword,
  forgotHospitalPassword,
} from "./auth.controller.js";
import {
  registerUserSchema,
  loginUserSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  registerHospitalSchema,
  loginHospitalSchema,
} from "./auth.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { verifyUser } from "./auth.middleware.js";

const router = Router();

// USER
router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(loginUserSchema), loginUser);
router.post("/logout", logoutUser);

router.get("/me", verifyUser, getCurrentUser);

router.patch(
  "/change-password",
  validateRequest(changePasswordSchema),
  verifyUser,
  changePassword,
);

router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
router.post("/reset-password", resetPassword);

// HOSPITAL
router.post(
  "/register-hospital",
  validateRequest(registerHospitalSchema),
  registerHospital,
);

router.post(
  "/login-hospital",
  validateRequest(loginHospitalSchema),
  loginHospital,
);

router.post("/hospitals/forgot-password", forgotHospitalPassword);
router.post("/hospirals/change-password", changeHospitalPassword);

export default router;
