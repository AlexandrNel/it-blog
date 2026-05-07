import { useMutation, useQuery } from "@tanstack/react-query";
import { PostAPI } from "../api/client";
import type { PostRequest } from "../api/types";
import { revalidatePost } from "@/shared/actions/revalidate-post";
import { revalidateSitemap } from "@/shared/actions/revalidate-sitemap";

export const usePostById = (id: string) => {
	return useQuery({
		queryFn: () => PostAPI.getPostById(id),
		queryKey: ["profile", "posts", id],
	});
};
export const usePostsByUser = (userId: string) => {
	return useQuery({
		queryFn: () => PostAPI.getPostsByUser(userId),
		queryKey: ["profile", "posts", userId],
	});
};
export const useCreatePost = () => {
	return useMutation({
		mutationFn: PostAPI.createPost,
		onSuccess: () => {
			revalidateSitemap();
		},
	});
};
export const useUpdatePost = () => {
	return useMutation({
		mutationFn: ({ data, id }: { data: PostRequest; id: string; slug: string }) =>
			PostAPI.updatePost(data, id),
		onSuccess: (_, ctx) => {
			revalidatePost(ctx.slug);
			revalidateSitemap();
		},
	});
};
export const useDeletePost = () => {
	return useMutation({
		mutationFn: PostAPI.deletePost,
		onSuccess: () => {
			revalidateSitemap();
		},
	});
};
