"use client";
import { BaseAPI } from "@/shared/api/base-api";
import type {
	ProfileConnectionKind,
	ProfileConnectionsPage,
	ProfileConnectionsSummary,
} from "../model/profile";
import { getMockProfileConnections, getMockProfileConnectionsSummary } from "./mock-connections";

export class ProfileAPI extends BaseAPI {
	static getConnections({
		userId,
		type,
		page,
		limit = 5,
	}: {
		userId: string;
		type: ProfileConnectionKind;
		page: number;
		limit?: number;
	}): Promise<ProfileConnectionsPage> {
		return getMockProfileConnections({ userId, type, page, limit });
	}

	static getConnectionsSummary(userId: string): Promise<ProfileConnectionsSummary> {
		return getMockProfileConnectionsSummary(userId);
	}
}
