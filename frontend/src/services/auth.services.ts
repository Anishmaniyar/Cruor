import { SignUpSchemaType } from "@/lib/validations/auth";

import api from "@/lib/axios";

export const registerUser = async (data: SignUpSchemaType) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};
