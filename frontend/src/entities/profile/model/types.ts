import type { Author } from "@/entities/user";

export type ProfileContact = {
  email?: string;
  site?: string;
  links?: {
    github?: string;
    telegram?: string;
  };
};

export type ProfileStatistic = {
  unpublishedPosts: number;
  publishedPosts: number;
  subscribers: number;
  viewers: number;
  comments: number;
};

export type ProfileMetaInfo =
  | {
      isOwner: true;
      isPublic: boolean;
      isBlocked: boolean;
    }
  | {
      isOwner: false;
      isPublic: boolean;
      isBlocked: boolean;
      isFollow: boolean;
    };

export type Profile = {
  author: Author;
  contacts: ProfileContact | null;
  bio: string;
};

export type ProfileConnectionKind = "followers" | "following";

export type ProfileConnectionUser = Pick<Author, "id" | "avatar" | "displayName" | "username">;

export type ProfileConnectionsPage = {
  users: ProfileConnectionUser[];
  nextPage: number | null;
  total: number;
};

export type ProfileConnectionsSummary = {
  followers: number;
  following: number;
};

export type FollowStatusResponse = { isFollowing: boolean };
export type FollowTypeRequest = {
  userId: string;
  action: "follow" | "unfollow";
};

export type ProfileSettings = {
  displayName: string;
  bio?: string;
  location?: string;
  contacts?: ProfileContact;
};

export type AccountSettings = {
  username: string;
  email: string;
};

export type ProfileSettingsResponse = {
  profile: ProfileSettings;
  account: AccountSettings;
  meta: { emailVerified: boolean };
};

export type ProfileRequest = Partial<ProfileSettings>;
