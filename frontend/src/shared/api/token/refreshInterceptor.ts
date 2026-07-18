import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { GlobalError } from "../types";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

type AxiosConfigWithRetry = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};

export function refreshInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError<GlobalError>) => {
      const originalRequest = error.config as AxiosConfigWithRetry;
      if (
        error.response?.status === 401 &&
        !originalRequest._isRetry &&
        !error.response.config.skipAuthRefresh
      ) {
        originalRequest._isRetry = true;
        try {
          await instance({
            url: "/auth/refresh",
            method: "POST",
            skipAuthRefresh: true,
          });
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
}
