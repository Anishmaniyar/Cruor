import { format } from "date-fns";

/* ─── Backend appointment statuses ─── */

export type AppointmentBackendStatus =
  | "BOOKED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type AppointmentDisplayStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No Show";

export const APPOINTMENT_STATUS_DISPLAY: Record<
  AppointmentBackendStatus,
  AppointmentDisplayStatus
> = {
  BOOKED: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

export function displayStatus(status: string): AppointmentDisplayStatus {
  return APPOINTMENT_STATUS_DISPLAY[status as AppointmentBackendStatus] ?? "Pending";
}

export const TERMINAL_STATUSES: AppointmentBackendStatus[] = [
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

/* ─── Backend appointment shape (GET /appointments/my, /hospital-my) ─── */

export interface AppointmentBackend {
  id: string;
  userId: string;
  hospitalId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentBackendStatus;
  createdAt: string;
  updatedAt?: string;
  hospital?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    name: string;
    phoneNo?: string | null;
    bloodGroup?: string | null;
  };
}

/* ─── Parsing helpers ─── */

export function parseAppointmentDate(value: string): Date {
  // Date-only values (YYYY-MM-DD) are parsed as UTC midnight by Date;
  // append a local time so comparisons match the user's timezone.
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);
}

/* ─── Formatting helpers ─── */

export function formatAppointmentDate(value: string): string {
  if (!value) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);
  if (isNaN(date.getTime())) return value;
  return format(date, "MMM d, yyyy");
}

export function formatAppointmentTime(value: string): string {
  if (!value) return "—";
  // Backend sends the time as a Date/Time value, e.g. "1970-01-01T09:30:00.000Z"
  // or a bare "09:30:00" string — extract the HH:MM portion.
  const match = value.match(/(\d{2}):(\d{2})/);
  if (!match) return value;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
}
