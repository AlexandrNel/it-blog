import { PostCardSkeleton } from "./PostCardSkeleton";
export const PostListSkeleton = ({
	count = 2,
	className,
}: {
	count?: number;
	className?: string;
}) => {
	return (
		<div className={className}>
			{[...Array(count)].map((_, i) => (
				<PostCardSkeleton key={`post-card-skeleton-${i}`} />
			))}
		</div>
	);
};
