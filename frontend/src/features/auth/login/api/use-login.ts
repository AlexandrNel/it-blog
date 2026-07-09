import { AuthAPI, type TAuth } from "@/entities/auth";
import { userFabricKeys } from "@/entities/user";
import { type ApiError } from "@/shared/api";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type UseLoginOptions = Omit<
  UseMutationOptions<TAuth.LoginResponse, ApiError, TAuth.LoginRequest>,
  "mutationFn"
>;

export const useLogin = ({ onSuccess, onError, ...rest }: UseLoginOptions = {}) => {
  return useMutation<TAuth.LoginResponse, ApiError, TAuth.LoginRequest>({
    mutationFn: AuthAPI.login,
    onError: (err, ...args) => {
      onError?.(err, ...args);
      if (err.rawResponse?.message) {
        toast.error(err.rawResponse?.message);
      }
    },
    onSuccess: (d, v, m, context) => {
      onSuccess?.(d, v, m, context);
      context.client.fetchQuery({ queryKey: userFabricKeys.me() });
    },
    ...rest,
  });
};
