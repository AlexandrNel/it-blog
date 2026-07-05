"use client";
import axios, { type InternalAxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
import { ENV } from "../config/env";
import { ApiError } from "../lib/api";
import { type ApiErrorType } from "../lib/api/api-error";
import { toast } from "sonner";

interface AxiosConfigWithRetry extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}
interface AxiosErrorWithRetry extends AxiosError {
  config: AxiosConfigWithRetry;
  response: AxiosResponse<ApiErrorType>;
}

const instance = axios.create({
  withCredentials: true,
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});
export const api = instance;

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosErrorWithRetry) => {
    const originalRequest = error.config;
    const status = error.response?.status ?? error.status ?? 500;
    const data = error.response?.data;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch {
        throw new ApiError(
          error.response?.data.message ?? "Неизвестная ошибка",
          error.response?.status,
          {
            message: error.response?.data.message,
            errors: error.response?.data.errors,
          },
        );
      }
    }
    const GLOBAL_ERRORS: Partial<Record<number, string>> = {
      429: data?.message ?? "Слишком много запросов, попробуйте позже.",
      500: "Ошибка сервера",
    };

    if (GLOBAL_ERRORS[status]) {
      toast.error(GLOBAL_ERRORS[status]);
    }

    let message = "Неизвестная ошибка";
    if (data?.message) {
      message = data.message;
    } else if (error.code === "ERR_NETWORK") {
      message = "Ошибка подключения к сети";
    }

    throw new ApiError(message, status, {
      message: message,
      errors: data?.errors,
    });
  },
);
