import { appointmentTemplates } from "./templates/appointment.template.js";

export const NotificationRegistry = {
  APPOINTMENT_BOOKED: {
    priority: "HIGH",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_BOOKED,
  },

  APPOINTMENT_CONFIRMED: {
    priority: "HIGH",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_CONFIRMED,
  },

  APPOINTMENT_CANCELLED: {
    priority: "CRITICAL",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_CANCELLED,
  },

  APPOINTMENT_RESCHEDULED: {
    priority: "HIGH",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_RESCHEDULED,
  },

  APPOINTMENT_REMINDER: {
    priority: "HIGH",
    channels: ["IN_APP", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_REMINDER,
  },

  APPOINTMENT_NO_SHOW: {
    priority: "MEDIUM",
    channels: ["IN_APP"],
    template: appointmentTemplates.APPOINTMENT_NO_SHOW,
  },

  APPOINTMENT_COMPLETED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: appointmentTemplates.APPOINTMENT_COMPLETED,
  },
};
