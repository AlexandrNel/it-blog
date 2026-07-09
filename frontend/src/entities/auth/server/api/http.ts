import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import { cookies } from "next/headers";
import type * as TAuth from "../../model/types";

export const auth = cache(async function auth(): Promise<TAuth.CheckAuthResponse> {
  const cookieRaw = (await cookies()).toString();
  const { data } = await serverSafeFetch<TAuth.TokenEntity>("/auth/check", {
    headers: { Cookie: cookieRaw },
  });
  if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
  return { isAuthenticated: false };
});
