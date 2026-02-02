import type { TPost } from "@/entities/articles";
import { type BackendError, api, isBackendError } from "@/shared/api/client";
import { API_URL } from "@/shared/config/env";

export type PostDataType = {
	content: string;
	title: string;
	desc: string;
	slug?: string;
	tags: string[];
};
export const createPost = async (postData: PostDataType) => {
	try {
		const { data } = await api.post<TPost | BackendError>(`${API_URL}/posts`, postData);
		if (isBackendError(data)) {
			return { message: data.message };
		}
		return data;
	} catch (error) {
		console.log(error);
		return { message: "Не удалось создать статью" };
	}
};
