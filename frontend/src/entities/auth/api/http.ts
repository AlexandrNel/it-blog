import { BaseAPI } from "@/shared/api/base-api";
import type * as TAuth from "../model/types";

export class AuthAPI extends BaseAPI {
  static login(data: TAuth.LoginRequest) {
    return BaseAPI.post<TAuth.LoginResponse>(`/auth/login`, { data });
  }
  static register(data: TAuth.RegisterRequest) {
    return BaseAPI.post<TAuth.RegisterResponse>(`/auth/register`, { data });
  }
  static logout() {
    return BaseAPI.post(`/auth/logout`);
  }
}
