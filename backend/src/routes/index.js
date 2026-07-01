import Router from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import hospitalRoutes from "../modules/hospital/hospital.routes.js";
import appointmentRoutes from "../modules/appointments/appointment.routes.js";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/hospital", hospitalRoutes);
rootRouter.use("/appointments", appointmentRoutes);

export default rootRouter;
