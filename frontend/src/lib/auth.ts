import type { User } from "@/types";

const TOKEN_KEY = "college_compare_token";
const USER_KEY = "college_compare_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuth(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    clearAuth();
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}
