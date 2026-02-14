export type AuthorDto = {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
};

export type TagDto = {
    id: string;
    name: string;
    key: string;
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

export type PostListItemDto = {
    id: string;
    title: string;
    slug: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
    authorId: string;
    categoryId: string;
    author: AuthorDto;
    tags: TagDto[];
    category?: { id: string; value: string };
    statistic: PostStatisticDto;
};

export type PostDetailDto = {
    id: string;
    title: string;
    slug: string;
    content: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
    authorId: string;
    categoryId: string;
    author: AuthorDto;
    tags: TagDto[];
};

export type PostStatisticResponseDto = {
    views: number;
    comments: number;
    votes: {
        likes: number;
        dislikes: number;
        userVote: number | null;
    };
};

export type PaginatedPostsResponseDto = {
    data: PostListItemDto[];
    pages: number;
};
