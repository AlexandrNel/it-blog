"use server";

import { updateTag } from "next/cache";
import { CACHE_TAGS } from "../config/cache-keys";

export const updateSitemap = async () => {
	updateTag(CACHE_TAGS.sitemap);
};
