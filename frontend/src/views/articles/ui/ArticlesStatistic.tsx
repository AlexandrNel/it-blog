"use client";
import { Eye, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Loading } from "@/shared/ui/loading";
import { useArticleStatistic } from "../model/useArticleStatistic";
import { voteConfig } from "../model/voteConfig";

interface Props extends BaseProps {
	postId: string;
}

export const ArticleStatistic = ({ className, postId }: Props) => {
	const { data, loading, like, dislike, isDisliked, isLiked } = useArticleStatistic(postId);
	const currentLikeStyle = isLiked ? voteConfig.LIKED : voteConfig.DEFAULT;
	const currentDislikeStyle = isDisliked ? voteConfig.DISLIKED : voteConfig.DEFAULT;
	return (
		<div className={cn("flex items-center select-none", className)}>
			<div className="flex items-center text-[#858585]">
				<Button
					disabled={loading || isLiked || isDisliked}
					onClick={() => like()}
					size={"icon-sm"}
					variant={"ghost"}
					className={"flex items-center gap-1 text-[#858585] text-xs "}
					style={{ background: currentLikeStyle.background }}
				>
					<ThumbsUp
						size={16}
						color={currentLikeStyle.color}
						className=" transition-all"
						strokeWidth={currentLikeStyle.strokeWidth}
					/>
				</Button>
				{loading ? (
					<Loading size={14} length={1} />
				) : (
					<span className="mx-1 text-xs">{data.score}</span>
				)}

				<Button
					disabled={loading || isLiked || isDisliked}
					onClick={() => dislike()}
					size={"icon-sm"}
					variant={"ghost"}
					className="flex items-center gap-1 text-[#858585] text-xs"
					style={{ background: currentDislikeStyle.background }}
				>
					<ThumbsDown
						size={16}
						color={currentDislikeStyle.color}
						strokeWidth={currentDislikeStyle.strokeWidth}
					/>
				</Button>
			</div>

			<div className="flex items-center gap-3 ml-1">
				<span className="flex items-center gap-1 text-[#858585] text-xs">
					<MessageSquare size={16} color="#858585" strokeWidth={1} />
					{loading ? <Loading size={14} length={1} /> : data.comments}
				</span>

				<span className="flex items-center gap-1 text-[#858585] text-xs">
					<Eye size={16} color="#858585" strokeWidth={1} />
					{loading ? <Loading size={14} length={1} /> : data.views}
				</span>
			</div>
		</div>
	);
};
