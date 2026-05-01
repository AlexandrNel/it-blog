import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import type { CheckAuthResponse, TokenEntity } from "./types";
import type { User } from "@/entities/user";
import { getHeadersWithCookies, type CookiesType } from "@/shared/lib/api";

export const auth = cache(async function auth(cookies: CookiesType): Promise<CheckAuthResponse> {
	const { data } = await serverSafeFetch<TokenEntity>("/auth/check", {
		headers: getHeadersWithCookies(cookies),
	});
	if (data) return { isAuthenticated: true, userId: data.id, role: data.role };
	return { isAuthenticated: false };
});
export const currentUser = cache(async (cookies: CookiesType) => {
	const { data } = await serverSafeFetch<User | null>("/auth/me", {
		headers: getHeadersWithCookies(cookies),
	});
	return data;
});
