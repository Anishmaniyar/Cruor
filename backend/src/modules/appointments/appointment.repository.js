import prisma from "../../db.js";

export const createConstAppointmentRepository = async (data) => {
  return await prisma.appointment.create({
    data,
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const findAppointmentByIdRepository = async (id) => {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      userId: true,
      hospitalId: true,
      appointmentDate: true,
      appointmentTime: true,
      status: true,
      hospital: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const findAppointments = async (userId) => {
  return await prisma.appointment.findMany({
    where: { userId },
    orderBy: { appointmentDate: "asc" },
  });
};

export const findHospitalAppointments = async (hospitalId) => {
  return await prisma.appointment.findMany({
    where: { hospitalId },
    include: {
      user: {
        select: { name: true, phoneNo: true, bloodGroup: true },
      },
    },
    orderBy: { appointmentDate: "asc" },
  });
};

export const hospitalExists = async (id) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id },
    select: { id: true },
  });
  return !!hospital;
};

export const checkHospitalVerification = async (id) => {
  const hospital = await prisma.hospital.findFirst({
    where: { id, isVerified: true },
    select: { id: true },
  });
  return !!hospital;
};

export const findConflictingUserAppointment = async (
  userId,
  appointmentDate,
  appointmentTime,
) => {
  return await prisma.appointment.findFirst({
    where: {
      userId,
      appointmentDate,
      appointmentTime,
      status: { in: ["BOOKED", "CONFIRMED"] },
    },
  });
};

export const findConflictingSlot = async (
  hospitalId,
  appointmentDate,
  appointmentTime,
) => {
  return await prisma.appointment.findFirst({
    where: {
      hospitalId,
      appointmentDate,
      appointmentTime,
      status: { in: ["BOOKED", "CONFIRMED"] },
    },
  });
};

export const confirmAppointmentRepository = async (id) => {
  return await prisma.appointment.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });
};

export const cancelAppointmentRepository = async (id) => {
  return await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
};

export const markNoShowRepository = async (id) => {
  return await prisma.appointment.update({
    where: { id },
    data: { status: "NO_SHOW" },
  });
};

export const completeAppointmentRepository = async (id) => {
  return await prisma.appointment.update({
    where: { id },
    data: { status: "COMPLETED" },
  });
};

export const createNotification = async (data) => {
  return await prisma.notification.create({ data });
};

export const findUpcomingAppointments = async (startTime, endTime) => {
  return await prisma.appointment.findMany({
    where: {
      status: "CONFIRMED",
      appointmentReminderSent: false,
      appointmentDate: {
        gte: startTime,
        lte: endTime,
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
    select: {
      id: true,
      userId: true,
      appointmentDate: true,
      appointmentTime: true,

      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const markAppointmentReminderSent = async (appointmentId) => {
  return await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      appointmentReminderSent: true,
    },
  });
};
