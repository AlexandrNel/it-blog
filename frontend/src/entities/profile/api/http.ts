"use client";
import { BaseAPI } from "@/shared/api/base-api";
import {
  type ProfileConnectionKind,
  type ProfileConnectionsPage,
  type ProfileConnectionsSummary,
  type ProfileStatistic,
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
    return BaseAPI.get(`/profile/${userId}/connections/${type}`, {
      params: {
        page,
        limit,
      },
    });
  }

  static getConnectionsSummary(userId: string): Promise<ProfileConnectionsSummary> {
    return BaseAPI.get(`/profile/${userId}/connections/summary`);
  }

  static getStatistic(userId: string): Promise<ProfileStatistic> {
    return BaseAPI.get(`/profile/${userId}/statistic`);
  }
}
