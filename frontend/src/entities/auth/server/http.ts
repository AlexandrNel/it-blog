import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import type * as TAuth from "../model/types";
import { cookies } from "next/headers";

export const auth = cache(async function auth(): Promise<TAuth.CheckAuthResponse> {
  const cookiesRaw = (await cookies()).toString();

  const { data } = await serverSafeFetch<TAuth.TokenEntity>("/auth/check", {
    headers: { Cookie: cookiesRaw },
  });
  if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
  return { isAuthenticated: false };
});
