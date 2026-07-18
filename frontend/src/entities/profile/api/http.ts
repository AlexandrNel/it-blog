import { BaseAPI } from "@/shared/api/http";
import type {
  FollowStatusResponse,
  FollowTypeRequest,
  ProfileRequest,
  ProfileSettingsResponse,
  ProfileConnectionKind,
  ProfileConnectionsPage,
  ProfileConnectionsSummary,
  ProfileStatistic,
} from "../model/types";

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
      params: { page, limit },
    });
  }

  static getConnectionsSummary(userId: string): Promise<ProfileConnectionsSummary> {
    return BaseAPI.get(`/profile/${userId}/connections/summary`);
  }

  static getStatistic(userId: string): Promise<ProfileStatistic> {
    return BaseAPI.get(`/profile/${userId}/statistic`);
  }
  static getFollowStatus(userId: string): Promise<FollowStatusResponse> {
    return BaseAPI.get(`/follows/status/${userId}`);
  }
  static updateFollowStatus({ action, userId }: FollowTypeRequest): Promise<FollowStatusResponse> {
    return BaseAPI.post(`/follows/${action}`, { userId });
  }
  static updateProfile(profile: ProfileRequest): Promise<void> {
    return BaseAPI.patch<void>("/profile", profile);
  }
  static getSettings(): Promise<ProfileSettingsResponse> {
    return BaseAPI.get<ProfileSettingsResponse>("/users/settings");
  }
}
