import { AuthAPI, useAuthStore } from "@/entities/auth";
import { type LoginRequest } from "@/entities/auth/api/types";
import { type User } from "@/entities/user";
import { type ApiError } from "@/shared/lib/api";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type UseLoginOptions = Omit<UseMutationOptions<User, ApiError, LoginRequest>, "mutationFn">;

export const useLogin = ({ onSuccess, onError, ...rest }: UseLoginOptions = {}) => {
  const { setUser } = useAuthStore();
  return useMutation<User, ApiError, LoginRequest>({
    mutationFn: AuthAPI.login,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
      setUser(data);
    },
    onError: (err, ...args) => {
      onError?.(err, ...args);
      if (err.rawResponse?.message) {
        toast.error(err.rawResponse?.message);
      }
    },
    ...rest,
  });
};
