import { Card } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileHeroSkeleton() {
	return (
		<Card>
			<Column>
				<Row justify={"between"}>
					<Row>
						<Skeleton className="size-9 rounded-full" />
						<Skeleton className="w-[80px] h-5" />
					</Row>
					<Row>
						<Skeleton className="w-[190px] h-9" />
					</Row>
				</Row>
				<Skeleton className="w-full h-15" />
			</Column>
		</Card>
	);
}
