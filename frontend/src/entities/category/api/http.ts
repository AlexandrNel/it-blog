import { api } from "@/shared/api/http";
import { type CategoryDTO } from "./types";

export const getAllCategories = async () => {
  const res = await api.get<CategoryDTO[]>("/categories");
  return res.data;
};
