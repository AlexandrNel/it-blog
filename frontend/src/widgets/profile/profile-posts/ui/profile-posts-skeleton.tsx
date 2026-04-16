import { Card } from "@/shared/ui/card";
import { Column } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProfilePostsSkeleton() {
	return (
		<Card>
			<Column gap={"sm"}>
				<Skeleton className="h-7 w-[100px]" />
				<Skeleton className="h-6 w-[180px]" />
			</Column>
		</Card>
	);
}
