import { BaseAPI } from "@/shared/api/base-api";

export class AccountAPI extends BaseAPI {
	static updateNickname = async (value: string): Promise<void> => {
		return BaseAPI.put("/users/username", { username: value });
	};
}
