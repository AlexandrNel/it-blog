import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../api/client";
import type { ApiError } from "@/shared/lib/api";
import type { User } from "@/entities/user";
import type { LoginRequest, RegisterRequest } from "../api/types";
import { toast } from "sonner";
import { useAuthStore } from "./AuthStore";

export const useLogin = () => {
	const { setUser } = useAuthStore();
	return useMutation<User, ApiError, LoginRequest>({
		mutationFn: AuthAPI.login,
		onSuccess: (data) => setUser(data),
		onError: (err) => {
			if (err.rawResponse?.message) {
				toast.error(err.rawResponse?.message);
			}
		},
	});
};

export const useRegister = () => {
	const { setUser } = useAuthStore();
	return useMutation<User, ApiError, RegisterRequest>({
		mutationFn: AuthAPI.register,
		onSuccess: (data) => setUser(data),
		onError: (err) => {
			if (err.rawResponse?.message) {
				toast.error(err.rawResponse?.message);
			}
		},
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: AuthAPI.logout,
		onSuccess: () => {
			window.location.reload();
		},
	});
};
