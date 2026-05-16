import { ApiError, isApiError, type BackendError } from "../lib/api/api-error";

const API_URL = process.env.API_URL

export const serverFetch = async <T>(endpoint: string, init?: RequestInit) => {
	const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
	const res = await fetch(url, init);
	const contentType = res.headers.get("content-type");
	let data: unknown;
	try {
		data = contentType?.includes("application/json") ? await res.json() : await res.text();
	} catch (error) {
		console.error(`Не удалось распарсить тело ответа от ${url}`, error);
		throw new ApiError(`Ошибка парсинга ответа от сервера (status ${res.status})`, res.status);
	}

	if (!res.ok) {
		throw new ApiError((data as Partial<BackendError>).message || "Неизвестная ошибка", res.status);
	}
	return {
		data: data as T,
		status: res.status,
		url,
		headers: res.headers,
		res,
	};
};

export const serverSafeFetch = async <T>(endpoint: string, init?: RequestInit) => {
	try {
		const res = await serverFetch(endpoint, init);
		return { data: res.data as T, error: null };
	} catch (error) {
		if (isApiError(error)) {
			return { data: null, error: error.message };
		}
		throw error;
	}
};
