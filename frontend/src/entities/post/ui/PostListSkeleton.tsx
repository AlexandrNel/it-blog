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
        <div key={`post-card-skeleton-${i}`} className="mb-2">
          <PostCardSkeleton />
        </div>
      ))}
    </div>
  );
};
