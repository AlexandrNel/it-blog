// --- Ключи кеша страниц (Next.js `cacheTag` / `revalidateTag`) ---

export const CACHE_TAGS = {
	sitemap: "sitemap",
	post: (postId: string) => `post-slug-${postId}`,
	profile: (userId: string) => `profile-${userId}`,
	profileStatistic: (userId: string) => `profile-${userId}-statistic`,
} as const;

// --- Ключи React Query ---

export const QUERY_KEYS = {
	profile: ["profile"],
} as const;
