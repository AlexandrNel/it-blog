"use client";
import { BaseAPI } from "@/shared/api/base-api";
import type {
	ProfileConnectionKind,
	ProfileConnectionsPage,
	ProfileConnectionsSummary,
} from "../model/profile";

export class ProfileAPI extends BaseAPI {
	static getConnections({
		userId,
		type,
		page = 1,
		limit = 10,
	}: {
		userId: string;
		type: ProfileConnectionKind;
		page: number;
		limit?: number;
	}): Promise<ProfileConnectionsPage> {
		return BaseAPI.get(`/profile/${userId}/connections/${type}?page=${page}&limit=${limit}`);
	}

	static getConnectionsSummary(userId: string): Promise<ProfileConnectionsSummary> {
		return BaseAPI.get(`/profile/${userId}/connections/summary`);
	}
}
