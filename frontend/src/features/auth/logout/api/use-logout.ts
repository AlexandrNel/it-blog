import { type MutationOptions, useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/entities/auth";
import { userFabricKeys } from "@/entities/user";

export type UseLogoutOptions = Omit<MutationOptions, "mutationFn">;

export const useLogout = ({ onSettled, ...options }: UseLogoutOptions = {}) => {
  return useMutation({
    mutationFn: AuthAPI.logout,
    onSettled: async (d, e, v, m, context) => {
      onSettled?.(d, e, v, m, context);
      await context.client.cancelQueries();
      context.client.resetQueries({ queryKey: userFabricKeys.me() });
    },
    ...options,
  });
};
