import { type ApiError } from "@/shared/lib/api";
import { type User } from "@/entities/user";
import { toast } from "sonner";
import { useAuthStore } from "@/entities/auth";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AuthAPI } from "@/entities/auth";
import { type RegisterRequest } from "@/entities/auth/api/types";

export type UseRegisterOptions = Omit<
  UseMutationOptions<User, ApiError, RegisterRequest>,
  "mutationFn"
>;

export const useRegister = ({ onError, onSuccess, ...rest }: UseRegisterOptions = {}) => {
  const { setUser } = useAuthStore();
  return useMutation<User, ApiError, RegisterRequest>({
    mutationFn: AuthAPI.register,
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
