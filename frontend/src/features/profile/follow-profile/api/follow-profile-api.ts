import { BaseAPI } from "@/shared/api/base-api";
import type { FollowStatusResponse, FollowTypeRequest } from "./types";

export class FollowApi extends BaseAPI {
	static getFollowStatus = async (userId: string): Promise<FollowStatusResponse> => {
		return BaseAPI.get(`/follows/status/${userId}`);
	};
	static updateFollowStatus = async ({
		action,
		userId,
	}: FollowTypeRequest): Promise<FollowStatusResponse> => {
		return BaseAPI.post(`/follows/${action}`, { userId });
	};
}
