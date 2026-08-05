import { format } from "date-fns";

/* ─── Backend campaign statuses ─── */

export type CampaignDisplayStatus =
  | "Upcoming"
  | "Active"
  | "Completed"
  | "Cancelled";

export const CAMPAIGN_STATUS_DISPLAY: Record<string, CampaignDisplayStatus> = {
  ACTIVE: "Active",
  CREATED: "Upcoming",
  FINISHED: "Completed",
  CANCELLED: "Cancelled",
};

export function displayCampaignStatus(status: string): CampaignDisplayStatus {
  return CAMPAIGN_STATUS_DISPLAY[status] ?? "Active";
}

/* ─── Backend campaign shape ─── */

export interface CampaignBackend {
  id: string;
  hospitalId: string;
  campName: string;
  description: string;
  address: string;
  campaignDate: string;
  startTime: string;
  endTime: string;
  targetDonors: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  hospital?: {
    id: string;
    name: string;
    address?: string | null;
  };
  _count?: {
    campaignRegistrations: number;
  };
}

/* ─── Registration shape (GET /campaigns/:id/registrations) ─── */

export interface CampaignRegistrationDonor {
  id: string; // campaign registration id (used to record a donation)
  registeredAt: string;
  user: {
    id: string;
    name: string;
    phoneNo: string | null;
    bloodGroup: string | null;
  };
}

/* ─── Formatting helpers ─── */

export function formatCampaignDate(value: string): string {
  if (!value) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);
  if (isNaN(date.getTime())) return value;
  return format(date, "MMM d, yyyy");
}

export function formatCampaignTime(value: string): string {
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
