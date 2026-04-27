"use client";

import { useProfileConnectionsSummary } from "@/entities/profile/model/profile-queries";
import { Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";
import { ProfileConnectionsDialog } from "./profile-connections-dialog";

export function ProfileConnectionsActions({ userId }: { userId: string }) {
	const { data, isLoading } = useProfileConnectionsSummary(userId);

	if (isLoading) {
		return (
			<Row className="gap-4">
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-5 w-28" />
			</Row>
		);
	}

	return (
		<Row className="gap-4">
			<ProfileConnectionsDialog userId={userId} type="following" count={0} />
			<ProfileConnectionsDialog userId={userId} type="followers" count={data?.followers} />
		</Row>
	);
}
