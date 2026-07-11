import { type BaseProps } from "@/shared/types/components";
import { Card, CardContent } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileInfoSkeleton({ className }: BaseProps) {
  return (
    <Card className={className}>
      <CardContent>
        <Column gap={"lg"}>
          <Column gap={"sm"}>
            <Skeleton className="h-7 w-[50%]" />
            <Skeleton className="w-full h-10" />
          </Column>
          <Column gap={"sm"}>
            {Array.from({ length: 2 }, (_, i) => (
              <Row key={`sidebar-skeleton-${i}`}>
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-[50%]" />
              </Row>
            ))}
          </Column>

          <Row className="flex-wrap">
            {Array.from({ length: 2 }, (_, i) => (
              <Skeleton key={`sidebar-link-skeleton-${i}`} className="w-22 h-8 rounded-full" />
            ))}
          </Row>
        </Column>
      </CardContent>
    </Card>
  );
}
