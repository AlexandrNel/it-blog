import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import { type CheckAuthResponse, type TokenEntity } from "./types";
import { type User } from "@/entities/user";
import { cookies } from "next/headers";

export const auth = cache(async function auth(): Promise<CheckAuthResponse> {
  const cookieRaw = (await cookies()).toString();
  const { data } = await serverSafeFetch<TokenEntity>("/auth/check", {
    headers: { Cookie: cookieRaw },
  });
  if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
  return { isAuthenticated: false };
});
export const currentUser = cache(async () => {
  const { data } = await serverSafeFetch<User | null>("/auth/me");
  return data;
});
