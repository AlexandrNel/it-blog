"use client";
import { type MutationOptions, useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/entities/auth";
import { AccessToken } from "@/shared/api/token";
import { userFabricKeys } from "@/entities/user";

export type UseLogoutOptions = Omit<MutationOptions, "mutationFn">;

export const useLogout = ({ onSuccess, ...options }: UseLogoutOptions = {}) => {
  return useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: async (res, v, r, context) => {
      onSuccess?.(res, v, r, context);
      await context.client.cancelQueries();
      AccessToken.clear();
      context.client.resetQueries({ queryKey: userFabricKeys.me() });
    },
    ...options,
  });
};
