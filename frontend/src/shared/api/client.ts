"use client";
import axios, { type InternalAxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
import { API_URL } from "../config/env";
import { ApiError } from "../lib/api";
import type { ApiErrorType } from "../lib/api/api-error";

interface AxiosConfigWithRetry extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}
interface AxiosErrorWithRetry extends AxiosError {
  config: AxiosConfigWithRetry;
  response: AxiosResponse<ApiErrorType>;
}

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
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
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        originalRequest._isRetry = false;
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch {
        throw new ApiError(error.response?.data.message ?? "Неизвестная ошибка", error.response?.status, {
          message: error.response?.data.message,
          errors: error.response?.data.errors,
        });
      }
    }

    const networkErrorMessage = "Ошибка подключения к сети";
    const backendErrorMessage = error.response.data.message;
    const status = error.response?.status ?? error.status ?? 500;

    let message = "Неизвестная ошибка";
    if (backendErrorMessage) {
      message = backendErrorMessage;
    } else if (error.code === "ERR_NETWORK") {
      message = networkErrorMessage;
    }

    throw new ApiError(message, status, {
      message: message,
      errors: error.response?.data.errors,
    });
  },
);
