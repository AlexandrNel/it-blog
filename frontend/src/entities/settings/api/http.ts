import { BaseAPI } from "@/shared/api/base-api";
import { type Settings } from "../model/types";

export class SettingsAPI extends BaseAPI {
  static getSettings(): Promise<Settings> {
    return BaseAPI.get<Settings>("/users/settings");
  }
}
