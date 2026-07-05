export type FollowStatusResponse = { isFollowing: boolean };
export type FollowTypeRequest = {
  userId: string;
  action: "follow" | "unfollow";
};
