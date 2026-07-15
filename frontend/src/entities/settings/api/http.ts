import { BaseAPI } from "@/shared/api/http";
import { type Settings } from "../model/types";

export class SettingsAPI extends BaseAPI {
  static getSettings(): Promise<Settings> {
    return BaseAPI.get<Settings>("/users/settings");
  }
}
