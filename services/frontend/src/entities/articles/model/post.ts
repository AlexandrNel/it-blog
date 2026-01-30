import type { TypeTag } from "@/entities/tag";

export type TAutor = {
    id: string;
    email: string,
    name: string | null;
    avatar: string | null;
};

export type TComment = {
    id: string;
    autor: TAutor;
    content: string;
    parentComment: string[];
    createdAt: string;
    updatedAt: string;
};


export type TPost = {
    id: string;
    tags: TypeTag[];
    slug: string;
    imageUrl: string;
    content: string;
    desc: string;
    // comments: TComment[] | [];
    title: string;
    author: TAutor;
    likesCount: number;
    // viewsCount: number;
    createdAt: string;
    updatedAt: string;
};
