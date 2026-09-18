import asyncHandler from "../../utils/asyncHandler.js";
import { NotificationRegistry } from "./notification.registry.js";
import * as NotificationRepository from "./notification.repository.js";
import { notificationQueue } from "./notification.queue.js";
import AppError from "../../utils/appError.js";

export const send = async (data) => {
  const { type, recipient, payload } = data;

  const config = NotificationRegistry[type];

  if (!config) {
    throw new AppError(`Notification type '${type}' is invalid.`, 400);
  }

  const notification = config.template(payload);

  const createNotification = await NotificationRepository.createNotification({
    userId: recipient.userId,

    title: notification.title,

    message: notification.message,

    priority: config.priority,

    type,
  });

  // REDIS DISABLED - re-enable when Redis is configured
  // The notification row above is still written to Postgres; only the queue
  // dispatch is skipped. notification.queue.js exports a no-op stand-in, so
  // this resolves without Redis and without breaking the caller.
  await notificationQueue.add("sendNotificationJob", {
    notification: createNotification,
    recipient,
  });

  return createNotification;
};

export const sendBulk = async (type, recipients, payload) => {
  const config = NotificationRegistry[type];
  if (!config)
    throw new AppError(`Notification type '${type}' is invalid.`, 400);

  const notificationTemplate = config.template(payload);

  const originalPromises = recipients.map(async (recipient) => {
    const createdNotification = await NotificationRepository.createNotification(
      {
        userId: recipient.userId,
        title: notificationTemplate.title,
        message: notificationTemplate.message,
        priority: config.priority,
        type,
      },
    );

    // REDIS DISABLED - re-enable when Redis is configured
    // Same as `send` above: the notification is persisted, dispatch is skipped.
    await notificationQueue.add(
      "sendNotificationJob",
      {
        notification: createdNotification,
        recipient,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },

        removeOnComplete: 100,

        removeOnFail: 50,
      },
    );

    return createdNotification;
  });

  const notifications = await Promise.all(originalPromises);

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
