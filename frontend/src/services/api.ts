import axios, { AxiosError } from "axios";
import { clearAuth, getToken } from "@/lib/auth";
import type { ApiError } from "@/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAuth();
      window.dispatchEvent(new Event("auth:changed"));
    }

    const data = error.response?.data;
    const message = Array.isArray(data?.message)
      ? data?.message.join(", ")
      : data?.message ?? error.message;

    return Promise.reject(new Error(message));
  },
);
