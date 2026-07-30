import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { DemoAPI } from "./http";
import { userFabricKeys } from "@/entities/user";

export type UseCreateDemoUserOptions = Omit<UseMutationOptions, "mutataionFn">;

export function useCreateDemoUser({ onSuccess, ...options }: UseCreateDemoUserOptions = {}) {
  return useMutation({
    mutationFn: DemoAPI.createDemoUser,
    onSuccess: (d, v, m, context) => {
      onSuccess?.(d, v, m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.me() });
    },
    ...options,
  });
}
