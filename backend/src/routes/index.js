import Router from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import hospitalRoutes from "../modules/hospital/hospital.routes.js";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/hospital", hospitalRoutes);

export default rootRouter;
