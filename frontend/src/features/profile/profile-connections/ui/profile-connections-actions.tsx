"use client";

import { useProfileConnectionsSummary } from "@/entities/profile/model/profile-queries";
import { Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";
import { ProfileConnectionsDialog } from "./profile-connections-dialog";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";

type Props = { userId: string } & BaseProps;

export function ProfileConnectionsActions({ userId, className }: Props) {
	const { data, isLoading } = useProfileConnectionsSummary(userId);

	if (isLoading) {
		return (
			<Row className={cn("gap-4", className)}>
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-5 w-28" />
			</Row>
		);
	}

	return (
		<Row className={cn("gap-4", className)}>
			<ProfileConnectionsDialog userId={userId} type="following" count={data?.following} />
			<ProfileConnectionsDialog userId={userId} type="followers" count={data?.followers} />
		</Row>
	);
}
