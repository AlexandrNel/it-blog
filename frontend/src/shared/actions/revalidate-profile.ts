"use server";

import { updateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const revalidateProfile = async (userId?: string) => {
  if (!userId) return;
  updateTag(CACHE_TAGS.profile(userId));
};
