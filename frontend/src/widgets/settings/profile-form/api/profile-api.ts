import { BaseAPI } from "@/shared/api/base-api";
import { type ProfileSettingsFormValues } from "../model/profile-schema";
import { type Settings } from "@/entities/settings";

export class ProfileSettingsAPI extends BaseAPI {
  static updateProfile = async (
    profile: ProfileSettingsFormValues & { userId?: string },
  ): Promise<Settings> => {
    return BaseAPI.patch<Settings>("/profile", profile);
  };
}
