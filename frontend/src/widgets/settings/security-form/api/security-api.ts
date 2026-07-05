import { BaseAPI } from "@/shared/api/base-api";

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export class SecuritySettingsAPI extends BaseAPI {
  static updatePassword = async (data: UpdatePasswordRequest) => {
    return BaseAPI.put("/users/password", data);
  };
}
