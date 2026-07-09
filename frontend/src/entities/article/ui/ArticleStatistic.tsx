import { Eye, MessageSquare, ThumbsUp } from "lucide-react";
import { type BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { type Statistic } from "../model/types";

interface Props extends BaseProps {
  statistic: Statistic;
}

export const ArticleStatistic = ({ className, statistic }: Props) => {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <span className="flex items-center gap-1 text-[#858585] text-xs">
        <ThumbsUp size={16} color="#858585" strokeWidth={1} />
        {statistic.votes.likes - statistic.votes.dislikes}
      </span>

      <span className="flex items-center gap-1 text-[#858585] text-xs">
        <MessageSquare size={16} color="#858585" strokeWidth={1} />
        {statistic.comments}
      </span>

      <span className="flex items-center gap-1 text-[#858585] text-xs">
        <Eye size={16} color="#858585" strokeWidth={1} />
        {statistic.views}
      </span>
    </div>
  );
};
