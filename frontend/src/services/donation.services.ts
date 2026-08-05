import api from "@/lib/axios";

/* ─── Types ─── */

export type DonationStatus = "COMPLETED" | "REJECTED";

export interface DonationRecord {
  id: string;
  donationDate: string;
  bloodGroup: string;
  volume: number;
  status: DonationStatus;
  hospital?: {
    name: string;
  };
}

export interface DonationHistoryItem {
  id: string;
  donationDate: string;
  status: DonationStatus;
  hospitalName: string;
  type: "Appointment" | "Campaign";
  time: string | null;
}

export interface DonationDashboardData {
  totalDonations: number;
  appointmentDonations: number;
  campaignDonations: number;
  livesImpacted: number;
  lastDonationDate: string | null;
  donationHistory: DonationHistoryItem[];
}

export interface HospitalDonation {
  id: string;
  donationDate: string;
  bloodGroup: string;
  volume: number;
  status: DonationStatus;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNo: string | null;
  };
}

interface ApiResponse<T> {
  status?: string;
  success?: boolean;
  message?: string;
  data: T;
}

export interface RecordDonationPayload {
  donationDate: string; // YYYY-MM-DD
  bloodGroup: string;
  volume: number;
  status: DonationStatus;
}

/* ─── User donation APIs ─── */

export const getMyDonations = async () => {
  const response = await api.get<
    ApiResponse<{ totalDonation: number; donations: DonationRecord[] }>
  >("/donations/my");

  return response.data;
};

export const getDonationById = async (donationId: string) => {
  const response = await api.get<
    ApiResponse<{ totalDonation: number; donations: DonationRecord[] }>
  >(`/donations/my/${donationId}`);

  return response.data;
};

export const getDonationDashboard = async () => {
  const response = await api.get<ApiResponse<DonationDashboardData>>(
    "/donations/dashboard-page",
  );

  return response.data;
};

/* ─── Hospital donation APIs ─── */

export const getHospitalDonations = async () => {
  const response = await api.get<
    ApiResponse<{ totalDonation: number; donations: HospitalDonation[] }>
  >("/donations/hospital");

  return response.data;
};

export const recordAppointmentDonation = async (
  appointmentId: string,
  payload: RecordDonationPayload,
) => {
  const response = await api.post<ApiResponse<{ donation: DonationRecord }>>(
    `/donations/appointments/${appointmentId}`,
    payload,
  );

  return response.data;
};

export const recordCampaignDonation = async (
  registrationId: string,
  payload: RecordDonationPayload,
) => {
  const response = await api.post<ApiResponse<{ donation: DonationRecord }>>(
    `/donations/campaigns/${registrationId}`,
    payload,
  );

  return response.data;
};

export const rejectDonation = async (donationId: string) => {
  const response = await api.patch<ApiResponse<DonationRecord>>(
    `/donations/${donationId}/reject`,
  );

  return response.data;
};
