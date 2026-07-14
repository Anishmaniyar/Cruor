import prisma from "../../db.js";

export const createNotification = async (data) => {
  return await prisma.notification.create({
    data,
  });
};

export const getNotification = async (userId) => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      priority: true,
      status: true,
      isRead: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getNotificationById = async (userId, notificationId) => {
  return await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId,
    },
  });
};

export const markAsRead = async (notificationId) => {
  return await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isRead: true,
    },
  });
};

export const markAllRead = async (userId) => {
  return await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const deleteNotification = async (notificationId) => {
  return await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });
};
