"use client";

import { Button } from "@/shared/ui/button";
import { useFollowStatus, useUpdateFollowStatus } from "../model/follow-profile-queries";
import { Spinner } from "@/shared/ui/spinner";

export const FollowButton = ({ userId, username }: { userId: string; username: string }) => {
  const { data, isLoading } = useFollowStatus(userId);
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
