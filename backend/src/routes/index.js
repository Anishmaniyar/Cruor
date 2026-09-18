// NOTE: this must be the named `Router` export. The default export is the
// express() function itself, so `Router()` would build a whole nested sub-app
// with its own default settings - including `etag: 'weak'`, which re-enabled
// ETags/304s even after app.set("etag", false).
import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import hospitalRoutes from "../modules/hospital/hospital.routes.js";
import appointmentRoutes from "../modules/appointments/appointment.routes.js";
import campaignRoutes from "../modules/campaign/campaign.routes.js";
import donationRoutes from "../modules/donations/donation.routes.js";
import bloodUnitRoutes from "../modules/blood-units/bloodUnit.routes.js";
import bloodRequestRoutes from "../modules/blood-request/bloodRequest.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";
import eligibilityRoutes from "../modules/eligibility/eligibility.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const rootRouter = Router();

// Unauthenticated, dependency-free liveness probe.
// Use it to confirm from a browser that the deployed API is reachable at
// https://<backend-host>/api/v1/health - if this does not respond, requests
// are not reaching this service at all and nothing will appear in the logs.
rootRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is reachable",
    timestamp: new Date().toISOString(),
  });
});

rootRouter.use("/auth", authRoutes);
rootRouter.use("/hospitals", hospitalRoutes);
rootRouter.use("/appointments", appointmentRoutes);
rootRouter.use("/campaigns", campaignRoutes);
rootRouter.use("/donations", donationRoutes);
rootRouter.use("/blood-units", bloodUnitRoutes);
rootRouter.use("/blood-requests", bloodRequestRoutes);
rootRouter.use("/notification", notificationRoutes);
rootRouter.use("/eligibility", eligibilityRoutes);
rootRouter.use("/dashboard", dashboardRoutes);

export default rootRouter;
