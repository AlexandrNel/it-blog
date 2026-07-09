import { BaseAPI } from "@/shared/api/base-api";
import { type UserResponse } from "../model/types";

export class UserAPI extends BaseAPI {
  static getMe(signal: AbortSignal) {
    return BaseAPI.get<UserResponse>(`/auth/me`, { signal });
  }
}
