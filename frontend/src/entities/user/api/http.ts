import { BaseAPI } from "@/shared/api/http";
import { CheckNicknameResponse, GenerateNicknameResponse, type UserResponse } from "../model/types";

export class UserAPI extends BaseAPI {
  static getMe(signal: AbortSignal) {
    return BaseAPI.get<UserResponse>(`/auth/me`, { signal });
  }
  static generateNickname() {
    return BaseAPI.get<GenerateNicknameResponse>(`/users/username/generate`);
  }
  static checkNickname(nickname: string = ""): Promise<{ isAvailable: boolean }> {
    return BaseAPI.get<CheckNicknameResponse>(`/users/check-username?username=${nickname}`);
  }
}
