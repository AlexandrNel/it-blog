import { Skeleton } from "@/shared/ui/skeleton";

export const PostCardSkeleton = () => {
  return (
    <div className="h-full flex flex-col transition-all bg-card text-foreground  rounded-lg  relative group">
      <div className="md:p-5 p-2 mt-auto rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="size-10 rounded-full md:size-11" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-28 md:h-5 md:w-32" />
              <Skeleton className="h-3 w-14 md:w-16" />
            </div>
            <Skeleton className="h-3 w-20 md:w-24" />
          </div>
        </div>
        <Skeleton className="h-7 w-3/4 md:h-8 mb-3" />
        <Skeleton className="w-full min-h-38 pb-[50%] rounded-lg md:mb-3 mb-2" />
        <div className="space-y-2 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[72%]" />
        </div>
        <Skeleton className="hidden h-7 w-28 rounded-md md:block mb-3" />
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="h-px bg-border/70" />
        <div className="flex items-center gap-3 mt-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
};
