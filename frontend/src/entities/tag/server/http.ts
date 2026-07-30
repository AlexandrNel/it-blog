import "server-only";
import { serverFetch } from "@/shared/api/server";
import type { Tag } from "../model/types";
import { cookies } from "next/headers";

export const getTagList = async (): Promise<Tag[]> => {
  const cookieRaw = (await cookies()).toString();
  const res = await serverFetch<Tag[]>(`/tags/popular`, { headers: { Cookie: cookieRaw } });
  return res.data;
};
