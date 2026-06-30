import Router from "express";

import authRoutes from "../modules/auth/auth.routes.js";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);

export default rootRouter;
