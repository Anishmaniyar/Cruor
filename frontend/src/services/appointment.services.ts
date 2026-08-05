import api from "@/lib/axios";
import type { AppointmentBackend } from "@/lib/appointment-utils";

interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export const bookAppointment = async (data: {
  hospitalId: string;
  appointmentDate: string;
  appointmentTime: string;
}) => {
  const response = await api.post<ApiResponse<{ appointment: AppointmentBackend }>>(
    "/appointments/",
    data,
  );

  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get<
    ApiResponse<{ total: number; appointments: AppointmentBackend[] }>
  >("/appointments/my");

  return response.data;
};

export const getAppointmentById = async (id: string) => {
  const response = await api.get<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/${id}`,
  );

  return response.data;
};

export const cancelAppointment = async (id: string) => {
  const response = await api.patch<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/${id}/cancel`,
  );

  return response.data;
};

/* ─── Hospital appointment endpoints ─── */

export const getHospitalAppointments = async () => {
  // Backend returns `{ message, data: AppointmentBackend[] }` — data is a bare array.
  const response = await api.get<{ message?: string; data: AppointmentBackend[] }>(
    "/appointments/hospital-my",
  );

  return response.data;
};

export const getHospitalAppointmentById = async (id: string) => {
  const response = await api.get<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/hospital-my/${id}`,
  );

  return response.data;
};

export const confirmAppointment = async (id: string) => {
  const response = await api.patch<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/${id}/confirm`,
  );

  return response.data;
};

export const markNoShowAppointment = async (id: string) => {
  const response = await api.patch<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/${id}/no-show`,
  );

  return response.data;
};

export const completeAppointment = async (id: string) => {
  const response = await api.patch<ApiResponse<{ appointment: AppointmentBackend }>>(
    `/appointments/${id}/complete`,
  );

  return response.data;
};
