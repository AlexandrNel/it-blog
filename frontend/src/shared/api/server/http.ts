import { GlobalError } from "../types";
import { ApiError } from "../validation";

const API_URL = process.env.API_URL;

export const serverFetch = async <T>(endpoint: string, init?: RequestInit) => {
  const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  let data: T;
  const res = await fetch(url, init);
  const contentType = res.headers.get("content-type");
  try {
    data = contentType?.includes("application/json") ? await res.json() : await res.text();
  } catch (error) {
    console.error(`Не удалось распарсить тело ответа от ${url}`, error);
    throw new ApiError(`Ошибка парсинга ответа от сервера (status ${res.status})`, res.status);
  }

  if (!res.ok) {
    throw new ApiError((data as Partial<GlobalError>).message || "Неизвестная ошибка", res.status, data as GlobalError);
  }
  return {
    data,
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
  } catch (err) {
    const error = err as ApiError;
    return { data: null, error: error.message };
  }
};
