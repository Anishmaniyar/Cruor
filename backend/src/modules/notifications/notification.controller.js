import asyncHandler from "../../utils/asyncHandler.js";
import * as NotificationService from "./notification.service.js";

export const getNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const allNotification =
    await NotificationService.getAllNotificationService(userId);

  return res.status(200).json({
    status: "success",
    message: "All notifications fetched successfully",
    data: allNotification,
  });
});

export const notificationIsRead = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const notificationId = req.params.id;

  const response = await NotificationService.notificationIsReadService(
    userId,
    notificationId,
  );

  return res.status(200).json({
    status: "success",
    message: "Notification is read successfully",
    data: response,
  });
});

export const markAllNotificationAsRead = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;

    const response =
      await NotificationService.notificationIsAllReadService(userId);

    return res.status(200).json({
      status: "success",
      message: "All notification are read successfully",
      data: response,
    });
  },
);

export const deleteNotification = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const notificationId = req.params.id;

  const response = await NotificationService.deleteNotificationService(
    userId,
    notificationId,
  );

  return res.status(200).json({
    status: "success",
    message: "Notification deleted successfully",
    data: response,
  });
});
