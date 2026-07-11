import { type BaseProps } from "@/shared/types/components";
import { Card, CardContent } from "@/shared/ui/card";
import { Column, Grid } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileHeroStatsSkeleton({ className }: BaseProps) {
  return (
    <Card className={className}>
      <CardContent>
        <Grid>
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={`skeleton-${i}`} className="w-full h-23">
              <Column className="p-4 h-full justify-between" justify="end">
                <Skeleton className="w-10 h-5" />
                <Skeleton className="w-18 h-5" />
              </Column>
            </Skeleton>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
