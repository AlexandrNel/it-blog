import { api } from "@/shared/api/client";
import type { CategoryDTO } from "../api/types.ts";

export const getAllCategories = async () => {
	const res = await api.get<CategoryDTO[]>("/categories");
	return res.data;
};
