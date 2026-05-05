"use server";

import { updateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const updateProfile = async (userId?: string) => {
	if (!userId) return;
	updateTag(CACHE_TAGS.profile(userId));
};
