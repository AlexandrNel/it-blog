"use client";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "@/shared/lib/utils/date/format-date";

interface Props extends BaseProps {
  value: string;
}

export const ArticleTime = ({ value, className }: Props) => {
  return (
    <time dateTime={value} className={cn("text-[13px] text-gray-400", className)}>
      {formatDate(value)}
    </time>
  );
};
