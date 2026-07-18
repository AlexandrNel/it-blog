import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { Skeleton } from "@/shared/ui/skeleton";

interface Props extends BaseProps {}

export const UserCardSkeleton = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Skeleton className="size-10 rounded-full md:size-11" />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 md:h-5 md:w-32" />
          <Skeleton className="h-3 w-14 md:w-16" />
        </div>
        <Skeleton className="h-3 w-20 md:w-24" />
      </div>
    </div>
  );
};
