import api from "../lib/axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
};

export const login = (payload: LoginPayload) => {
  return api.post("/auth/login", payload);
};

export const register = (payload: RegisterPayload) => {
  return api.post("/auth/register", payload);
};
