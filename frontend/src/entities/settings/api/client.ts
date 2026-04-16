import { BaseAPI } from "@/shared/api/base-api";
import type { Settings } from "../model/settings";

export class SettingsAPI extends BaseAPI {
	static getSettings = async (): Promise<Settings> => {
		return BaseAPI.get<Settings>("/users/settings");
	};
}
