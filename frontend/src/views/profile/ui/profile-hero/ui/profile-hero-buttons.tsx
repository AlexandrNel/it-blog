"use client";

import { UserQueries } from "@/entities/user";
import { CheckAutWrapper } from "@/features/auth/check-auth";
import { FollowButton } from "@/features/profile/follow-profile";
import { Skeleton } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Row } from "@/shared/ui/layout";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroButtons({ userId, username }: { userId: string; username: string }) {
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading } = useQuery(UserQueries.getMe());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading)
    return (
      <Row justify={"end"}>
        <Skeleton className="h-10 w-[100px]" />
      </Row>
    );
  return (
    <Row justify={"end"}>
      {user?.id === userId ? (
        <Button asChild>
          <Link href="/settings">
            Редактировать <span className="md:block hidden">профиль</span>
          </Link>
        </Button>
      ) : (
        <CheckAutWrapper>
          <FollowButton userId={userId} username={username} />
        </CheckAutWrapper>
      )}
    </Row>
  );
}
