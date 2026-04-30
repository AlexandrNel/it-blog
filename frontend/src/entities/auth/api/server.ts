"use server";

import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import type { CheckAuthResponse, TokenEntity } from "./types";
import type { User } from "@/entities/user";
import { getHeadersWithCookies } from "@/shared/lib/api";

export const auth = cache(async function auth(): Promise<CheckAuthResponse> {
	const headers = await getHeadersWithCookies();
	const { data } = await serverSafeFetch<TokenEntity>("/auth/check", { headers });
	if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
	return { isAuthenticated: false };
});
export const currentUser = cache(async () => {
	const headers = await getHeadersWithCookies();
	const { data } = await serverSafeFetch<User | null>("/auth/me", { headers });
	return data;
});
