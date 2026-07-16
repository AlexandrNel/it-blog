// TODO: пересмотреть cache tags

export const CACHE_TAGS = {
  sitemap: "sitemap",
  post: (slug: string) => `post-slug-${slug}`,
  profile: (userId: string) => `profile-${userId}`,
  profileStatistic: (userId: string) => `profile-${userId}-statistic`,
} as const;
