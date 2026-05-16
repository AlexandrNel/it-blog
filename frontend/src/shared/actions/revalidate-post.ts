"use server";

import { revalidateTag, updateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const revalidatePost = async (slug?: string) => {
	if (!slug) return;
	revalidateTag(CACHE_TAGS.post(slug), "max");
};
