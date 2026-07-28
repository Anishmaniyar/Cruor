import {
  appointmentSchema,
  appointmentSchemaType,
} from "@/lib/validations/appointment";

import api from "@/lib/axios";

export const bookAppointment = async (data: appointmentSchemaType) => {
  const response = await api.post("/appointments/", data);

  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");

  return response.data;
};
