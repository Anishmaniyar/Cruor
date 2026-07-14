import { Router } from "express";

import { verifyUser } from "../auth/auth.middleware.js";
import {
  getNotifications,
  notificationIsRead,
  markAllNotificationAsRead,
  deleteNotification,
} from "./notification.controller.js";

const router = Router();

router.get("/", verifyUser, getNotifications);

router.patch("/:id/read", verifyUser, notificationIsRead);

router.delete("/:id", verifyUser, deleteNotification);

router.patch("/read-all", verifyUser, markAllNotificationAsRead);

export default router;
