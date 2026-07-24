import { LogInSchemaType, SignUpSchemaType } from "@/lib/validations/auth";

import api from "@/lib/axios";

export const registerUser = async (data: SignUpSchemaType) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LogInSchemaType) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
