import { env } from "@/shared/config";
import type { GlobalError } from "../types";
import { ApiError } from "../validation";
import type { Route } from "next";
import type { RefreshReponse } from "../token";

const API_URL = env.NEXT_PUBLIC_API_URL;

async function tryRefresh(headers?: HeadersInit): Promise<RefreshReponse | null> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh` as Route, { method: "POST", headers });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const serverFetch = async <T>(
  endpoint: string,
  init?: RequestInit,
  isRetry = false,
): Promise<{
  data: T;
  status: number;
  url: string;
  headers: Headers;
  res: Response;
}> => {
  const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  let data: T;

  const res = await fetch(url, init);

  try {
    data = await res.json();
  } catch (error) {
    console.error(`Не удалось распарсить тело ответа от ${url}`, error);
    throw new ApiError(`Ошибка парсинга ответа от сервера (status ${res.status})`, res.status);
  }

  if (!res.ok) {
    if (!isRetry && res.status === 401) {
      const refreshed = await tryRefresh(init?.headers);

      if (refreshed) {
        const headers = new Headers({ ...init?.headers });
        headers.set("Authorization", `Bearer ${refreshed.token}`);
        return serverFetch<T>(endpoint, { ...init, headers }, true);
      }
    }
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
