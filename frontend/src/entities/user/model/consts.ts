import { createEntityKeys } from "@/shared/lib/utils";

export const userFabricKeys = createEntityKeys("user", {
  me: () => ["user", "me"],
  nickname: (value: string) => ["user", "nickname", value],
});
