import api from "@/lib/axios";

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phoneNo: string | null;
  address: string | null;
  registrationId: string;
  role: string;
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export const getHospitals = async () => {
  const response = await api.get<ApiResponse<{ hospitals: Hospital[] }>>("/hospitals/");
  return response.data;
};

export const getHospitalById = async (id: string) => {
  const response = await api.get<ApiResponse<{ hospital: Hospital; message?: string }>>(
    `/hospitals/${id}`,
  );
  return response.data;
};
