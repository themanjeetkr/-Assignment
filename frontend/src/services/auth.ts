import { api } from "@/services/api";
import type { AuthResponse } from "@/types";

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = LoginPayload & {
  name: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function signup(payload: SignupPayload) {
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  return data;
}
