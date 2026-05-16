import { BaseAPI } from "@/shared/api/base-api";
import type { User } from "@/entities/user";
import type { LoginRequest, RegisterRequest } from "./types";

export class AuthAPI extends BaseAPI {
	static login(user: LoginRequest) {
		return BaseAPI.post<User>(`/auth/login`, user);
	}
	static register(user: RegisterRequest) {
		return BaseAPI.post<User>(`/auth/register`, user);
	}
	static logout() {
		return BaseAPI.post(`/auth/logout`);
	}
}
