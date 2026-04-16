import type { Author } from "@/entities/author";

export type ProfileContacts = {
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
  contacts: ProfileContacts | null;
  bio: string;
};
