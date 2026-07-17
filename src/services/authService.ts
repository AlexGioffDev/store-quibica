import { apiFetch } from "./api";
import type { LoginPayload, LoginData } from "@/types";

export function login(payload: LoginPayload): Promise<LoginData> {
  return apiFetch<LoginData>("/auth/login", {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
