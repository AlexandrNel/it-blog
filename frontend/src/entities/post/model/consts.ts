import { createEntityKeys } from "@/shared/lib/utils";

export const postFabricKeys = createEntityKeys("post", {
  byUser: (userId: string) => ["post", "user", userId] as const,
  statistic: (postId: string) => ["post", "statistic", postId] as const,
});
