import { type ApiError } from "@/shared/api";
import { toast } from "sonner";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AuthAPI, type TAuth } from "@/entities/auth";
import { userFabricKeys } from "@/entities/user";

export type UseRegisterOptions = Omit<
  UseMutationOptions<TAuth.RegisterResponse, ApiError, TAuth.RegisterRequest>,
  "mutationFn"
>;

export const useRegister = ({ onError, onSettled, ...rest }: UseRegisterOptions = {}) => {
  return useMutation<TAuth.RegisterResponse, ApiError, TAuth.RegisterRequest>({
    mutationFn: AuthAPI.register,
    onError: (err, ...args) => {
      onError?.(err, ...args);
      if (err.rawResponse?.message) {
        toast.error(err.rawResponse?.message);
      }
    },
    onSettled: (d, e, v, m, context) => {
      onSettled?.(d, e, v, m, context);
      context.client.invalidateQueries({ queryKey: userFabricKeys.me() });
    },
    ...rest,
  });
};
