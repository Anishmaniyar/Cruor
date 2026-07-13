import prisma from "../../db.js";

export const createNotification = async (data) => {
  return await prisma.notification.create({
    data,
  });
};

export const getNotification = async () => {};

export const markAsRead = async () => {};

export const markAllRead = async () => {};

export const deleteNotification = async () => {};
