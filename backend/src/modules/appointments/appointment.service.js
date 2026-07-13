import * as appointmentRepository from "./appointment.repository.js";
import AppError from "../../utils/appError.js";

export const bookAppointmentService = async (data) => {
  const { userId, hospitalId, appointmentDate, appointmentTime } = data;

  const hospitalExists = await appointmentRepository.hospitalExists(hospitalId);
  if (!hospitalExists) {
    throw new AppError("Hospital does not exist", 404);
  }

  const hospitalVerified =
    await appointmentRepository.checkHospitalVerification(hospitalId);
  if (!hospitalVerified) {
    throw new AppError("Hospital is not verified", 403);
  }

  const now = new Date();
  const requestedDateTime = new Date(appointmentDate);
  requestedDateTime.setHours(appointmentTime.getUTCHours());
  requestedDateTime.setMinutes(appointmentTime.getUTCMinutes());
  if (requestedDateTime < now) {
    throw new AppError(
      "Appointment date and time cannot be in the past or yesterday",
      400,
    );
  }

  const userConflict =
    await appointmentRepository.findConflictingUserAppointment(
      userId,
      appointmentDate,
      appointmentTime,
    );
  if (userConflict) {
    throw new AppError(
      "You already have an appointment scheduled at this exact time",
      409,
    );
  }

  const slotConflict = await appointmentRepository.findConflictingSlot(
    hospitalId,
    appointmentDate,
    appointmentTime,
  );
  if (slotConflict) {
    throw new AppError(
      "This time slot is already fully booked at this hospital",
      409,
    );
  }

  const appointment =
    await appointmentRepository.createConstAppointmentRepository({
      userId,
      hospitalId,
      appointmentDate,
      appointmentTime,
      status: "BOOKED",
    });

  await NotificationService.send(
    NotificationType.APPOINTMENT_BOOKED,
    {
      hospitalId,
    },
    {
      appointmentDate,
      appointmentTime,
    },
  );

  return appointment;
};

export const getMyAppointmentsService = async (userId, role) => {
  if (role === "HOSPITAL") {
    return await appointmentRepository.findHospitalAppointments(userId);
  }
  return await appointmentRepository.findAppointments(userId);
};

export const getAppointmentByIdService = async (id, actorId, role) => {
  const appointment =
    await appointmentRepository.findAppointmentByIdRepository(id);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }

  if (role === "USER" && appointment.userId !== actorId) {
    throw new AppError(
      "You do not have permission to view this appointment",
      403,
    );
  }
  if (role === "HOSPITAL" && appointment.hospitalId !== actorId) {
    throw new AppError(
      "You do not have permission to view this appointment",
      403,
    );
  }

  return appointment;
};

export const cancelAppointmentService = async (
  appointmentId,
  actorId,
  role,
) => {
  const appointment =
    await appointmentRepository.findAppointmentByIdRepository(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }

  if (role === "USER" && appointment.userId !== actorId) {
    throw new AppError(
      "You do not have permission to cancel this appointment",
      403,
    );
  }
  if (role === "HOSPITAL" && appointment.hospitalId !== actorId) {
    throw new AppError(
      "You do not have permission to cancel this appointment",
      403,
    );
  }

  if (appointment.status === "COMPLETED" || appointment.status === "NO_SHOW") {
    throw new AppError(
      "Cannot cancel an appointment that has already concluded",
      400,
    );
  }

  return await appointmentRepository.cancelAppointmentRepository(appointmentId);
};

export const confirmAppointmentService = async (appointmentId, hospitalId) => {
  const appointment =
    await appointmentRepository.findAppointmentByIdRepository(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
  if (appointment.hospitalId !== hospitalId) {
    throw new AppError(
      "You do not have permission to manage this appointment",
      403,
    );
  }
  if (appointment.status !== "BOOKED") {
    throw new AppError(
      `Cannot confirm an appointment that is currently ${appointment.status}`,
      400,
    );
  }

  const updatedAppointment =
    await appointmentRepository.confirmAppointmentRepository(appointmentId);

  await appointmentRepository.createNotification({
    userId: appointment.userId,
    title: "Appointment Confirmed",
    message: "Your requested appointment has been accepted by the hospital.",
    type: "APPOINTMENT_REMINDER",
    isRead: false,
  });

  return updatedAppointment;
};

export const markNoShowService = async (appointmentId, hospitalId) => {
  const appointment =
    await appointmentRepository.findAppointmentByIdRepository(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
  if (appointment.hospitalId !== hospitalId) {
    throw new AppError(
      "You do not have permission to manage this appointment",
      403,
    );
  }
  if (appointment.status !== "CONFIRMED") {
    throw new AppError(
      "Only confirmed appointments can be marked as no-show",
      400,
    );
  }

  return await appointmentRepository.markNoShowRepository(appointmentId);
};

export const completeAppointmentService = async (appointmentId, hospitalId) => {
  const appointment =
    await appointmentRepository.findAppointmentByIdRepository(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
  if (appointment.hospitalId !== hospitalId) {
    throw new AppError(
      "You do not have permission to manage this appointment",
      403,
    );
  }
  if (appointment.status !== "CONFIRMED") {
    throw new AppError("Only confirmed appointments can be completed", 400);
  }

  return await appointmentRepository.completeAppointmentRepository(
    appointmentId,
  );
};
