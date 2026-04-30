import { Skeleton } from "@/shared/ui/skeleton";

export const PostCardSkeleton = () => {
	return (
		<div className="h-full flex flex-col transition-all bg-card text-foreground  rounded-lg  relative group">
			<div className="px-5 py-3  mt-auto  rounded-lg">
				<div className="flex gap-2 items-center mb-2">
					<Skeleton className="rounded-full h-10 w-10" />
					<div className="flex flex-col gap-2">
						<Skeleton className="w-37.5 h-5" />
						<Skeleton className="w-20 h-3" />
					</div>
				</div>
				<Skeleton className="w-50 h-6 mb-2" />
				<Skeleton className="rounded-lg w-full h-100 mb-2" />
				<Skeleton className="w-[30%] h-5 mb-1" />
				<Skeleton className="w-[50%] h-5 mb-1" />
				<Skeleton className="w-[90%] h-5 mb-1" />
			</div>
		</div>
	);
};
