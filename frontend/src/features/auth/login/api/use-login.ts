import { AuthAPI, type TAuth } from "@/entities/auth";
import { userFabricKeys } from "@/entities/user";
import { type DefaultError, type UseMutationOptions, useMutation } from "@tanstack/react-query";

export type UseLoginOptions = Omit<
  UseMutationOptions<TAuth.LoginResponse, DefaultError, TAuth.LoginRequest>,
  "mutationFn"
>;

export const useLogin = ({ onSuccess, ...rest }: UseLoginOptions = {}) => {
  return useMutation<TAuth.LoginResponse, DefaultError, TAuth.LoginRequest>({
    mutationFn: AuthAPI.login,
    onSuccess: (d, v, m, context) => {
      onSuccess?.(d, v, m, context);
      context.client.fetchQuery({ queryKey: userFabricKeys.me() });
    },
    ...rest,
  });
};
