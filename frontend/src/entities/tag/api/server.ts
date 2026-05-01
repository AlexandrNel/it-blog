import { serverSafeFetch } from "@/shared/api/server";
import type { Tag } from "../model/tag";

export const getTagList = async ({ headers }: { headers: Headers }): Promise<Tag[]> => {
	const res = await serverSafeFetch<Tag[]>(`/tags/popular`, { headers });
	return res.data ?? [];
};
