/**
 * Post DTOs barrel: re-exports request and response DTOs.
 * For direct imports use ~/dto/post-request.dto.js or ~/dto/post-response.dto.js.
 */

export {
    createPostSchema,
    validateCreatePost,
    type CreatePostRequestDto,
    type ParsedCreatePostDto,
} from "./post-request.dto.js";

export {
    type AuthorDto,
    type PaginatedPostsResponseDto,
    type PostPreviewDto,
    type PostStatisticDto,
    type PostStatisticResponseDto,
    type PostVotesStatisticDto,
} from "./post-response.dto.js";

// ─── Legacy (deprecated) ─────────────────────────────────────────────────────

import { createPostSchema, type CreatePostRequestDto, validateCreatePost } from "./post-request.dto.js";

/** @deprecated Use createPostSchema from post-request.dto */
export const postSchema = createPostSchema;

/** @deprecated Use CreatePostRequestDto from post-request.dto */
export type PostDataType = CreatePostRequestDto;

/** @deprecated Use validateCreatePost from post-request.dto */
export const validatePostSchema = validateCreatePost;
