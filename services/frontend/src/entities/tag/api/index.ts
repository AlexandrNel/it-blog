import { api } from "@/shared/api/client";

export const getTagList = async (): Promise<string[]> => {
	const { data } = await api.get(`/tags`);
	return data;
};
