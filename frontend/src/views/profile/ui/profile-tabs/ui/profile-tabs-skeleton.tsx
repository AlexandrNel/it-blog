import { Card, CardContent } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";

export const ProfileTabsSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Row className="flex-nowrap overflow-auto">
          <TabSkeleton />
          <TabSkeleton className="w-37.5" />
        </Row>
      </CardContent>
    </Card>
  );
};

const TabSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`h-9 w-25 flex items-center transition-colors justify-center px-4 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground ${className}`}
    ></div>
  );
};
