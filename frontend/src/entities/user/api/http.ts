import { BaseAPI } from "@/shared/api/http";
import type {
  CheckNicknameResponse,
  GenerateNicknameResponse,
  UpdatePasswordRequest,
  UpdateUsernameRequest,
  UserResponse,
} from "../model/types";

export class UserAPI extends BaseAPI {
  static getMe(signal: AbortSignal) {
    return BaseAPI.get<UserResponse>(`/auth/me`, { signal });
  }
  static generateNickname() {
    return BaseAPI.get<GenerateNicknameResponse>(`/users/username/generate`);
  }
  static checkNickname(username: string): Promise<{ isAvailable: boolean }> {
    return BaseAPI.get<CheckNicknameResponse>(`/users/check-username`, { params: { username } });
  }
  static updatePassword(data: UpdatePasswordRequest) {
    return BaseAPI.put("/users/password", data);
  }
  static updateNickname(data: UpdateUsernameRequest): Promise<void> {
    return BaseAPI.put("/users/username", data);
  }
}
