import { BaseAPI } from "@/shared/api/http";
import { type CheckNicknameResponse, type GenerateNicknameResponse } from "./types";

export class NicknameAPI extends BaseAPI {
  static generateNickname() {
    return BaseAPI.get<GenerateNicknameResponse>(`/users/username/generate`);
  }
  static checkNickname(nickname: string = ""): Promise<{ isAvailable: boolean }> {
    return BaseAPI.get<CheckNicknameResponse>(`/users/check-username?username=${nickname}`);
  }
}
