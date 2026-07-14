import asyncHandler from "../../utils/asyncHandler.js";
import { NotificationRegistry } from "./notification.registry.js";
import * as NotificationRepository from "./notification.repository.js";

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

export const sendBulk = asyncHandler(async (req, res, next) => {
  const { type, recipient, payload } = req.body;

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
});
