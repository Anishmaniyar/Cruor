import Router from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import hospitalRoutes from "../modules/hospital/hospital.routes.js";
import appointmentRoutes from "../modules/appointments/appointment.routes.js";
import campaignRoutes from "../modules/campaign/campaign.routes.js";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/hospitals", hospitalRoutes);
rootRouter.use("/appointments", appointmentRoutes);
rootRouter.use("/campaigns", campaignRoutes);

export default rootRouter;
