import { createEntityKeys } from "@/shared/lib/utils";

export const profileFabricKeys = createEntityKeys("profile", {
  connections: (userId: string, ...args: unknown[]) => ["profile", userId, "connections", ...args],
  connectionSummary: (userId: string) => ["profile", userId, "connections", "summary"],
});
