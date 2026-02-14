import type { Category, Post, Tag } from "~/generated/prisma/client.js";

/** Author shape in list/preview responses (only fields we select in postPreviewInclude). */
export type AuthorDto = {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
};

export type PostVotesStatisticDto = {
    likes: number;
    dislikes: number;
};

export type PostStatisticDto = {
    votes: PostVotesStatisticDto;
    views: number;
    comments: number;
};
export type PostStatisticWithUserVoteDto = {
    votes: PostVotesStatisticDto & { userVote: number | null };
    views: number;
    comments: number;
};

export type PostFullDto = Post & {
    author: AuthorDto;
    tags: Tag[];
    category: Category;
}
export type PostPreviewDto = Omit<Post, 'content'> & {
    author: AuthorDto;
    tags: Tag[];
    category: Category
    statistic: PostStatisticDto;
}

export type PostFullResponseDto = PostFullDto

export type PostPreviewResponseDto = PostPreviewDto

export type PostStatisticResponseDto = PostStatisticWithUserVoteDto

export type PaginatedPostsResponseDto = {
    data: PostPreviewDto[];
    pages: number;
};
