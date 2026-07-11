import { type Author } from "@/entities/user";

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
