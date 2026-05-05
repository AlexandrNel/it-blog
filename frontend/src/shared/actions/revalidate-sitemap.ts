"use server";

import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const revalidateSitemap = async () => {
	revalidateTag(CACHE_TAGS.sitemap, "max");
};
