import { useMutation, useQuery } from "@tanstack/react-query";
import { PostAPI } from "../api/client";
import type { PostRequest } from "../api/types";
import { updateSitemap } from "@/shared/actions/update-sitemap";

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
		onSuccess: () => updateSitemap(),
	});
};
export const useUpdatePost = () => {
	return useMutation({
		mutationFn: ({ data, id }: { data: PostRequest; id: string }) => PostAPI.updatePost(data, id),
		onSuccess: () => updateSitemap(),
	});
};
export const useDeletePost = () => {
	return useMutation({
		mutationFn: PostAPI.deletePost,
		onSuccess: () => updateSitemap(),
	});
};
