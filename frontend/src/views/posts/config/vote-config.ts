export type LikeState = "DEFAULT" | "LIKED" | "DISLIKED";

export const voteConfig: Record<
  LikeState,
  { background?: string; color: string; strokeWidth: number }
> = {
  DEFAULT: { background: undefined, color: "#858585", strokeWidth: 1 },
  LIKED: { background: "#e5ff9c", color: "#83b300", strokeWidth: 2 },
  DISLIKED: { background: "#ff040463", color: "#ff0000", strokeWidth: 2 },
};
