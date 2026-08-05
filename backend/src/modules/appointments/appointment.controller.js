import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as appointmentService from "./appointment.service.js";

export const bookAppointment = asyncHandler(async (req, res, next) => {
  const { hospitalId, appointmentDate, appointmentTime } = req.body;
  const userId = req.user.id;

  const appointment = await appointmentService.bookAppointmentService({
    userId,
    hospitalId,
    appointmentDate,
    appointmentTime,
  });

  return res.status(201).json({
    status: "success",
    message: "Booked Appointment successfully",
    data: {
      appointment,
    },
  });
});

export const getMyAppointments = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const role = req.user.role;

  const appointments = await appointmentService.getMyAppointmentsService(
    userId,
    role,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointments fetched successfully",
    data: {
      total: appointments.length,
      appointments,
    },
  });
});

export const getAppointmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const actorId = req.user.id;
  const role = req.user.role;

  const appointment = await appointmentService.getAppointmentByIdService(
    id,
    actorId,
    role,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment fetched successfully",
    data: {
      appointment,
    },
  });
});

export const cancelAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const actorId = req.user.id;
  const role = req.user.role;

  const appointment = await appointmentService.cancelAppointmentService(
    appointmentId,
    actorId,
    role,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment cancelled successfully",
    data: {
      appointment,
    },
  });
});

export const confirmAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const hospitalId = req.hospital.id;

  const appointment = await appointmentService.confirmAppointmentService(
    appointmentId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment confirmed successfully",
    data: {
      appointment,
    },
  });
});

export const markNoShow = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const hospitalId = req.hospital.id;

  const appointment = await appointmentService.markNoShowService(
    appointmentId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment marked as No Show successfully",
    data: {
      appointment,
    },
  });
});

export const completeAppointment = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const hospitalId = req.hospital.id;

  const appointment = await appointmentService.completeAppointmentService(
    appointmentId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment completed successfully",
    data: {
      appointment,
    },
  });
});

export const getHospitalAppointments = asyncHandler(async (req, res, next) => {
  const hospitalId = req.hospital.id;

  const appointments =
    await appointmentService.getMyAppointmentsHospitalService(hospitalId);

  return res.status(200).json({
    message: "All appointments fetched successfully",
    data: appointments,
  });
});

export const getHospitalAppointmentById = asyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const hospitalId = req.hospital.id;

  const appointment = await appointmentService.getHospitalAppointmentByIdService(
    appointmentId,
    hospitalId,
  );

  return res.status(200).json({
    status: "success",
    message: "Appointment fetched successfully",
    data: {
      appointment,
    },
  });
});
