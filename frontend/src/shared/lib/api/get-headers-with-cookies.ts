"use server";
import { cookies } from "next/headers";

export async function getHeadersWithCookies() {
	const cookieStore = await cookies();
	const cookieRaw = cookieStore.toString();
	const localHeaders = new Headers();
	localHeaders.set("Cookie", cookieRaw);
	return localHeaders;
}
