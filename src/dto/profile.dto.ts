import z from "zod";
import type { AuthorDto } from "./post-response.dto.js";

export const updateProfileSchema = z.object({
  bio: z.string().max(2000).optional(),
  contacts: z
    .object({
      email: z.email().optional(),
      site: z.url().optional(),
      links: z
        .object({
          github: z.url({ hostname: /github/ }).optional(),
          telegram: z.url({ hostname: /telegram/ }).optional(),
        })
        .optional(),
    })
    .optional(),
});

export type UpdateProfileRequestDto = z.infer<typeof updateProfileSchema>;

export type ProfileContactsDto = UpdateProfileRequestDto;

export type ProfileDto = {
  author: AuthorDto;
  contacts: ProfileContactsDto | null;
  bio: string;
};
export type ProfileStatsDto = {
  publishedPosts: number;
  subscribers: number;
  viewers: number;
};

export type ProfileMetaInfoDto = {
  isOwner: boolean;
  isPublic: boolean;
  isBlocked: boolean;
};

export type ProfileResponseDto = ProfileDto;
export type ProfileStatsResponseDto = ProfileStatsDto;
export type ProfileMetaInfoResponseDto = ProfileMetaInfoDto;
