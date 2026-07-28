import api from "@/lib/axios";

// ========== Donor-side APIs ==========

// Fetch all active campaigns (browse page)
export const getCampaigns = async () => {
  const response = await api.get("/campaigns");
  return response.data;
};

// Fetch single campaign by ID (register page)
export const getCampaignById = async (campaignId: string) => {
  const response = await api.get(`/campaigns/${campaignId}`);
  return response.data;
};

// Register for a campaign
export const registerForCampaign = async (campaignId: string) => {
  const response = await api.post(`/campaigns/${campaignId}/register`);
  return response.data;
};

// Cancel campaign registration
export const cancelRegistration = async (campaignId: string) => {
  const response = await api.patch(`/campaigns/${campaignId}/cancel-registration`);
  return response.data;
};

// Get logged-in user's campaign registrations
export const getMyRegistrations = async () => {
  const response = await api.get("/campaigns/my-registration");
  return response.data;
};

// ========== Hospital-side APIs ==========

// Create a new campaign
export const createCampaign = async (data: {
  campName: string;
  description: string;
  address: string;
  campaignDate: string;
  startTime: string;
  endTime: string;
  targetDonors: number;
}) => {
  const response = await api.post("/campaigns", data);
  return response.data;
};

// Update an existing campaign
export const updateCampaign = async (
  campaignId: string,
  data: Partial<{
    campName: string;
    description: string;
    address: string;
    campaignDate: string;
    startTime: string;
    endTime: string;
    targetDonors: number;
  }>
) => {
  const response = await api.patch(`/campaigns/${campaignId}`, data);
  return response.data;
};

// Get all campaigns for a hospital
export const getHospitalCampaigns = async () => {
  const response = await api.get("/campaigns/hospital");
  return response.data;
};

// Get registrations for a specific campaign (hospital view)
export const getCampaignRegistrations = async (campaignId: string) => {
  const response = await api.get(`/campaigns/${campaignId}/registrations`);
  return response.data;
};
