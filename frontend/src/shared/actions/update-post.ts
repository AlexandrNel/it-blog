"use server";

import { updateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const updatePost = async (postId?: string) => {
	if (!postId) return;
	updateTag(CACHE_TAGS.post(postId));
};
