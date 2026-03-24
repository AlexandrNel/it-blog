import z from "zod";
import type { AuthorDto } from "./post-response.dto.js";

const optionalUrl = (pattern?: RegExp) =>
  z.preprocess(
    (val) => (val === "" ? undefined : val),
    pattern ? z.url({ hostname: pattern }).optional() : z.url().optional(),
  );

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Введите имя" })
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(1, { message: "Введите фамилию" })
    .optional()
    .or(z.literal("")),
  bio: z.string().max(2000).optional(),
  location: z.string().optional().or(z.literal("")),
  contacts: z
    .object({
      email: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.email().optional(),
      ),
      site: optionalUrl(),
      links: z
        .object({
          github: optionalUrl(/github/),
          telegram: optionalUrl(/telegram/),
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
