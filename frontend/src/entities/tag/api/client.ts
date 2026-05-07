import { api } from "@/shared/api/client";
import type { Tag } from "../model/tag";
import type { TagDto } from "./types";

export const getTagListClient = async (): Promise<TagDto[]> => {
  const res = await api<Tag[]>(`/tags`);
  return res.data;
};
