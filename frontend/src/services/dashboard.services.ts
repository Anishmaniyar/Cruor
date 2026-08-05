import api from "@/lib/axios";

/* ─── Dashboard data types (matches GET /dashboard response) ─── */

export interface DashboardNextAppointment {
  date: string;
  time: string;
  hospital: string;
}

export interface DashboardNearbyCampaign {
  id: string;
  campName: string;
  address: string;
  campaignDate: string;
  hospital: {
    name: string;
    address: string | null;
  };
}

export interface DashboardData {
  totalDonations: number;
  livesImpacted: number;
  nextAppointment: DashboardNextAppointment | null;
  eligiblity: string | null;
  nearByCampaigns: DashboardNearbyCampaign[];
}

/* ─── Dashboard API ─── */

/** GET /dashboard — donor dashboard aggregate data. */
export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<{ status: string; data: DashboardData }>(
    "/dashboard",
  );

  return response.data.data;
};
