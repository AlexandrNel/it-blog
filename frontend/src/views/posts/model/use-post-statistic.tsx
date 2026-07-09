"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostAPI } from "@/entities/post";
import { toast } from "sonner";
import { type Statistic } from "@/entities/post";

export const usePostStatistic = (postId: string) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Statistic>({
    queryKey: [`post:${postId}:statistic`],
    queryFn: () => PostAPI.getStatistic(postId),
  });
  const vote = (action: "like" | "dislike") =>
    action === "like" ? PostAPI.sendLike(postId) : PostAPI.sendDislike(postId);
  const mutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`post:${postId}:statistic`] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isLiked = data?.votes.userVote === 1;
  const isDisliked = data?.votes.userVote === -1;
  const score = data ? data.votes.likes - data.votes.dislikes : 0;

  return {
    data: { score, comments: data?.comments, views: data?.views },
    loading: isFetching || !data,
    like: () => mutation.mutate("like"),
    dislike: () => mutation.mutate("dislike"),
    isLiked,
    isDisliked,
  };
};
