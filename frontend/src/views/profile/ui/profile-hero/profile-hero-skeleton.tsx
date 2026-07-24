import { Card, CardContent } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileHeroSkeleton() {
  return (
    <div>
      <Skeleton className="min-h-35 pb-[30%] flex" />
      <Card className="relative">
        <CardContent>
          <Column>
            <div className="rounded-full bg-card p-1 absolute -top-7.5">
              <Skeleton className="size-15 rounded-full" />
            </div>
            <Row justify={"end"}>
              <Skeleton className="w-[190px] h-9" />
            </Row>
            <Row>
              <Skeleton className="w-[80px] h-5" />
            </Row>
            <Skeleton className="w-full h-15" />
          </Column>
        </CardContent>
      </Card>
    </div>
  );
}
