"use client";

import { ProfileQueries } from "@/entities/profile";
import { Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";
import { ProfileConnectionsDialog } from "./profile-connections-dialog";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { useQuery } from "@tanstack/react-query";

type Props = { userId: string } & BaseProps;

export function ProfileConnectionsActions({ userId, className }: Props) {
  const { data, isLoading } = useQuery(ProfileQueries.connectionsSummary(userId));

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
