import type { TPost } from "../model/post"
import { notFound } from "next/navigation"
import { http } from "@/shared/api/client"
import { cache } from "react"
import { SortParams } from "@/shared/consts/categories"

export const getPostList = cache(async (sortBy?: SortParams) => {
    try {
        const { data } = await http.get<TPost[]>(`/posts?sortBy=${sortBy}`,)
        return data
    } catch (error) {
        console.log(error);
        return []
    }
})

export const getPostBySlug = cache(async (slug: string): Promise<TPost> => {

    const { data, status } = await http.get<TPost>(`/posts/${slug}`,)
    if (status === 404) {
        notFound()
    }
    if (status !== 200) {
        throw new Error('Не удалось загрузить статью ')
    }
    return data
})
export const getPostsByTag = async (tag: string): Promise<TPost[]> => {
    const { data, status } = await http.get(`/posts/tag/${tag}`,)
    if (status === 404) {
        notFound()
    }
    if (status !== 200) {
        throw new Error('Не удалось загрузить статью Сервер вернул ')
    }
    return data
}
export const getPostById = async (id: string): Promise<TPost> => {
    const { data } = await http.get(`/posts/id/${id}`,)
    return data
}
