import { headers } from "next/headers";

export async function isMobileRequest() {
	return (await headers()).get("x-is-mobile") === "1";
}
