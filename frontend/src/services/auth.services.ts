import {
  ChangePasswordSchemaType,
  LogInSchemaType,
  SignUpSchemaType,
} from "@/lib/validations/auth";

import api from "@/lib/axios";

/* ─── Shared response types ─── */

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  gender: string | null;
  dateOfBirth: string | null;
  bloodGroup: string | null;
  phoneNo: string | null;
}

export interface CurrentHospital {
  id: string;
  name: string;
  email: string;
  phoneNo: string | null;
  address: string | null;
  registrationId: string;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

interface AuthTokens {
  accessToken: string;
}

/* ─── User auth ─── */

export const registerUser = async (data: SignUpSchemaType) => {
  const response = await api.post<
    ApiResponse<{ user: { id: string; name: string; email: string } } & AuthTokens>
  >("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LogInSchemaType) => {
  const response = await api.post<
    ApiResponse<{ user: { id: string; name: string; email: string } } & AuthTokens>
  >("/auth/login", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<ApiResponse<CurrentUser>>("/auth/me");
  return response.data;
};

export const changePassword = async (data: ChangePasswordSchemaType) => {
  const response = await api.patch("/auth/change-password", {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });

  return response.data;
};

/* ─── Hospital auth ─── */

export interface HospitalRegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  registrationId: string;
}

export const registerHospital = async (data: HospitalRegisterPayload) => {
  const response = await api.post<
    ApiResponse<
      { hospital: { id: string; name: string; email: string; registrationId: string } } & AuthTokens
    >
  >("/auth/hospital-register", data);

  return response.data;
};

export const loginHospital = async (data: LogInSchemaType) => {
  const response = await api.post<
    ApiResponse<{
      hospital: { id: string; name: string };
      accessToken: string;
      message?: string;
    }>
  >("/auth/hospital-login", data);

  return response.data;
};

export const logoutHospital = async () => {
  const response = await api.post("/auth/hospital-logout");
  return response.data;
};

export const getCurrentHospital = async () => {
  const response = await api.get<ApiResponse<CurrentHospital>>("/auth/hospital-me");
  return response.data;
};

export const changeHospitalPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/auth/hospital/change-password", data);
  return response.data;
};

export const updateHospitalProfile = async (
  id: string,
  data: { name?: string; email?: string; phoneNo?: string },
) => {
  const response = await api.patch(`/hospitals/${id}`, data);
  return response.data;
};
