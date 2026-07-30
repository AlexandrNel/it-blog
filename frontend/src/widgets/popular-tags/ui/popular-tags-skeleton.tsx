import { Row, Skeleton } from "@/shared/ui";

export function PopularTagsSkeleton() {
  return (
    <div className="rounded-lg p-3 bg-card">
      <Skeleton className="h-6 w-[60%] mb-3" />
      <Row className="flex-wrap">
        <Skeleton className="rounded-sm h-6 w-20" />
        <Skeleton className="rounded-sm h-6 w-16" />
        <Skeleton className="rounded-sm h-6 w-18" />
        <Skeleton className="rounded-sm h-6 w-14" />
        <Skeleton className="rounded-sm h-6 w-24" />
      </Row>
    </div>
  );
}
