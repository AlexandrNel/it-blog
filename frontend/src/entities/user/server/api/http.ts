import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import type { UserResponse } from "../../model/types";

export const currentUser = cache(async () => {
  const { data } = await serverSafeFetch<UserResponse>("/auth/me");
  return data;
});
