"use client";

import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { useUpdateFollowStatus } from "../api/useUpdateFollowStatus";
import { ProfileQueries } from "@/entities/profile";
import { useQuery } from "@tanstack/react-query";

export const FollowButton = ({ userId, username }: { userId: string; username: string }) => {
  const { data, isLoading } = useQuery(ProfileQueries.followStatus(username));
  const { mutate, isPending } = useUpdateFollowStatus(username);
  const loading = isLoading || isPending;

  return (
    <Button
      variant={data?.isFollowing ? "outline" : "default"}
      disabled={loading}
      onClick={() =>
        mutate({
          userId,
          action: data?.isFollowing ? "unfollow" : "follow",
        })
      }
    >
      {loading && <Spinner />}
      {data?.isFollowing ? "Отписаться" : "Подписаться"}
    </Button>
  );
};
