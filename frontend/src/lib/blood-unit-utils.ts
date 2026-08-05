import { formatAppointmentDate } from "./appointment-utils";
import type { BloodUnitStatus } from "@/services/bloodUnit.services";

export const BLOOD_UNIT_STATUSES: BloodUnitStatus[] = [
  "AVAILABLE",
  "RESERVED",
  "TRANSFERRED",
  "USED",
  "EXPIRED",
  "REJECTED",
];

export const BLOOD_UNIT_STATUS_DISPLAY: Record<BloodUnitStatus, string> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  TRANSFERRED: "Transferred",
  USED: "Used",
  EXPIRED: "Expired",
  REJECTED: "Rejected",
};

export function displayBloodUnitStatus(status: string): string {
  return BLOOD_UNIT_STATUS_DISPLAY[status as BloodUnitStatus] ?? status;
}

/* Allowed next statuses — mirrors backend/src/modules/blood-units/bloodUnit.transitions.js */
export const BLOOD_UNIT_TRANSITIONS: Record<BloodUnitStatus, BloodUnitStatus[]> = {
  AVAILABLE: ["RESERVED", "EXPIRED", "REJECTED"],
  RESERVED: ["AVAILABLE", "TRANSFERRED"],
  TRANSFERRED: ["USED"],
  USED: [],
  EXPIRED: [],
  REJECTED: [],
};

export const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

/** Date-only values (YYYY-MM-DD) are parsed as local midnight; falls back to raw value. */
export const formatBloodUnitDate = formatAppointmentDate;
