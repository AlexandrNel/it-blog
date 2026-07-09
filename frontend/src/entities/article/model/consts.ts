import { createEntityKeys } from "@/shared/lib/utils";

export const articleFabricKeys = createEntityKeys("article", {
  byUser: (userId: string) => ["article", "byUser", userId] as const,
  statistic: (postId: string) => ["article", "statistic", postId] as const,
});
