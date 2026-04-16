import { serverSafeFetch } from "@/shared/api/server";
import type { Tag } from "../model/tag";
import { getHeadersWithCookies } from "@/shared/lib/api";

export const getTagList = async (): Promise<Tag[]> => {
	const headers = await getHeadersWithCookies();
	const res = await serverSafeFetch<Tag[]>(`/tags/popular`, { headers });
	return res.data ?? [];
};
