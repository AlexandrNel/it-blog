import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { GlobalError } from "../types";
import { AccessToken } from "./access-token";
import type { RefreshReponse } from "./types";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

type AxiosConfigWithRetry = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};
type QueuePromise = {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
};

export function refreshInterceptor(instance: AxiosInstance) {
  let isRefreshing = false;
  let failedQueue: QueuePromise[] = [];

  const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    failedQueue = [];
  };

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError<GlobalError>) => {
      const originalRequest = error.config as AxiosConfigWithRetry;
      if (error.response?.status === 401 && !originalRequest._isRetry && !error.response.config.skipAuthRefresh) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              originalRequest._isRetry = true;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        originalRequest._isRetry = true;
        try {
          const response = await instance.request<RefreshReponse>({
            url: "/auth/refresh",
            method: "POST",
            skipAuthRefresh: true,
          });

          AccessToken.token = response.data.token;
          originalRequest.headers.set("Authorization", AccessToken.header);
          processQueue(null);
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
}
