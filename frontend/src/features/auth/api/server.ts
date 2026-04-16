import { serverSafeFetchWithCookies } from "@/shared/api/server";
import { cache } from "react";
import type { CheckAuthResponse, TokenEntity } from "./types";
import type { User } from "@/entities/user";

export const auth = cache(async function auth(): Promise<CheckAuthResponse> {
	const { data } = await serverSafeFetchWithCookies<TokenEntity>("/auth/check");
	if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
	return { isAuthenticated: false };
});
export const currentUser = cache(async () => {
	const { data } = await serverSafeFetchWithCookies<User | null>("/auth/me");
	return data;
});
