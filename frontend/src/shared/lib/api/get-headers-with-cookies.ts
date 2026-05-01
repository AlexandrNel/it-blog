import type { cookies as cookiesFunc } from "next/headers";
export type CookiesType = Awaited<ReturnType<typeof cookiesFunc>>;

export function getHeadersWithCookies(cookies: CookiesType) {
	const cookieRaw = cookies.toString();
	const headers = new Headers();
	headers.set("Cookie", cookieRaw);
	return headers;
}
