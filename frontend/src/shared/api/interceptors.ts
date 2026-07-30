"use client";
import type { AxiosInstance } from "axios";
import { refreshInterceptor } from "./token";
import { AccessToken } from "./token/access-token";

export function applyInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    if (AccessToken.token) {
      config.headers.set("Authorization", AccessToken.header);
    }
    return config;
  });

  refreshInterceptor(instance);
}
