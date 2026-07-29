import { appointmentTemplates } from "./templates/appointmentBooked.js";
import { authTemplates } from "./templates/authenticationModule.js";
import { campaignTemplates } from "./templates/campaignModule.js";
import { donationTemplates } from "./templates/donationModule.js";
import { bloodRequestTemplates } from "./templates/bloodRequestModule.js";
import { bloodTransferTemplates } from "./templates/bloodTransferModule.js";
import { channel } from "node:diagnostics_channel";
import { eligiblityTemplates } from "./templates/eligibleAgain.js";

export const NotificationRegistry = {
  REGISTER_USER: {
    priority: "MEDIUM",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: authTemplates.WELCOME,
  },

  PASSWORD_CHANGE: {
    priority: "MEDIUM",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: authTemplates.PASSWORD_CHANGE,
  },

  PASSWORD_RESET: {
    priority: "MEDIUM",
    channels: ["IN_APP", "EMAIL", "PUSH"],
    template: authTemplates.PASSWORD_RESET,
  },

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

  CAMPAIGN_CREATED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_CREATED,
  },

  CAMPAIGN_REGISTERED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_REGISTERED,
  },

  CAMPAIGN_CANCELLED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_CANCELLED,
  },

  CAMPAIGN_UPDATE: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_UPDATE,
  },

  CAMPAIGN_REGISTRATION_CANCELLEDL: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_REGISTRATION_CANCELLED,
  },

  CAMPAIGN_REMINDER: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.CAMPAIGN_REMINDER,
  },

  WAITLIST_APPROVAL: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: campaignTemplates.WAITLIST_APPROVED,
  },

  DONATION_COMPLETED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: donationTemplates.DONATION_COMPLETED,
  },

  CERTIFICATE_READY: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: donationTemplates.CERTIFICATE_READY,
  },

  BLOOD_TEST_FAILED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: donationTemplates.BLOOD_TEST_FAILED,
  },

  BLOOD_REQUEST_ACCEPTED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodRequestTemplates.BLOOD_REQUEST_ACCEPTED,
  },

  BLOOD_REQUEST_REJECTED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodRequestTemplates.BLOOD_REQUEST_REJECTED,
  },

  BLOOD_REQUEST_OFFER_SELECTED: {
    priority: "HIGH",
    channels: ["IN_APP", "PUSH"],
    template: bloodRequestTemplates.BLOOD_REQUEST_OFFER_SELECTED,
  },

  BLOOD_REQUEST_CANCELLED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodRequestTemplates.BLOOD_REQUEST_CANCELLED,
  },

  BLOOD_TRANSFER_CREATED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodTransferTemplates.BLOOD_TRANSFER_CREATED,
  },

  BLOOD_TRANSFER_DISPATCHED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodTransferTemplates.BLOOD_TRANSFER_DISPATCHED,
  },

  BLOOD_TRANSFER_RECEIVED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodTransferTemplates.BLOOD_TRANSFER_RECEIVED,
  },

  BLOOD_TRANSFER_COMPLETED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodTransferTemplates.BLOOD_TRANSFER_COMPLETED,
  },

  BLOOD_TRANSFER_CANCELLED: {
    priority: "MEDIUM",
    channels: ["IN_APP", "PUSH"],
    template: bloodTransferTemplates.BLOOD_TRANSFER_CANCELLED,
  },

  ELIGIBLITY_REMINDER: {
    priority: "HIGH",
    channels: ["IN_APP", "PUSH"],
    template: eligiblityTemplates.ELIGIBLITY_REMINDER,
  },
};
