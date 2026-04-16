import { api } from "@/shared/api/client";
import { cache } from "react";
import type { User } from "../model/user";

export const getUser = cache(async () => {
	const { data } = await api.get<User>(`/auth/me`, { fetchOptions: { cache: "no-store" } });
	return data;
});
