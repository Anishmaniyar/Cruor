import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { verifyUser } from "../auth/auth.middleware.js";
import { verifyHospital, restrictTo } from "../../middleware/authorize.js";
import {
  createAppointmentSchema,
  appointmentIdParamSchema,
} from "./appointment.validator.js";
import {
  bookAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  confirmAppointment,
  markNoShow,
  completeAppointment,
  getHospitalAppointments,
} from "./appointment.controller.js";

const router = Router();

// 1. Static Actions / Standard Creation
router.post(
  "/",
  verifyUser,
  validateRequest(createAppointmentSchema),
  bookAppointment,
);

router.get("/my", verifyUser, getMyAppointments);

// 2. Hospital Static Route (MOVED UP HERE)
router.get(
  "/hospital",
  verifyHospital,
  restrictTo("HOSPITAL"),
  getHospitalAppointments,
);

// 3. Dynamic / Wildcard Routes (MUST BE LAST)
router.get(
  "/:id",
  verifyUser,
  validateRequest(appointmentIdParamSchema),
  getAppointmentById,
);

router.patch(
  "/:id/cancel",
  verifyUser,
  validateRequest(appointmentIdParamSchema),
  cancelAppointment,
);

router.patch(
  "/:id/confirm",
  verifyHospital,
  restrictTo("HOSPITAL"),
  validateRequest(appointmentIdParamSchema),
  confirmAppointment,
);

router.patch(
  "/:id/no-show",
  verifyHospital,
  restrictTo("HOSPITAL"),
  validateRequest(appointmentIdParamSchema),
  markNoShow,
);

router.patch(
  "/:id/complete",
  verifyHospital,
  restrictTo("HOSPITAL"),
  validateRequest(appointmentIdParamSchema),
  completeAppointment,
);

export default router;
