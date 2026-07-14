import asyncHandler from "../../utils/asyncHandler.js";
import { NotificationRegistry } from "./notification.registry.js";
import * as NotificationRepository from "./notification.repository.js";
import AppError from "../../utils/appError.js";

export const send = asyncHandler(async (req, res, next) => {
  const { type, recipient, payload } = req.body;

  const config = NotificationRegistry[type];

  const notification = config.template(payload);

  await NotificationRepository.createNotification({
    userId: recipient.userId,

    title: notification.title,

    message: notification.message,

    priority: config.priority,

    type,
  });
});

export const sendBulk = async (type, recipients, payload) => {
  const notifications = [];

  for (const recipient of recipients) {
    const notification = await send({
      type,
      recipient,
      payload,
    });

    notifications.push(notification);
  }

  return notifications;
};

export const getAllNotificationService = async (userId) => {
  const response = await NotificationRepository.getNotification(userId);

  return response;
};

export const notificationIsReadService = async (userId, notifcationId) => {
  const userOwnsNotification = await NotificationRepository.getNotificationById(
    userId,
    notifcationId,
  );

  if (!userOwnsNotification) {
    throw new AppError("Notification is not owned by user", 403);
  }

  const updateNotification =
    await NotificationRepository.markAsRead(notifcationId);

  return updateNotification;
};

export const notificationIsAllReadService = async (userId) => {
  const updateAllNotification =
    await NotificationRepository.markAllRead(userId);

  return updateAllNotification;
};

export const deleteNotificationService = async (userId, notifcationId) => {
  const userOwnsNotification = await NotificationRepository.getNotificationById(
    userId,
    notifcationId,
  );

  if (!userOwnsNotification) {
    throw new AppError("Notification is not owned by user", 403);
  }

  const deleteNotification =
    await NotificationRepository.deleteNotification(notifcationId);

  return deleteNotification;
};
