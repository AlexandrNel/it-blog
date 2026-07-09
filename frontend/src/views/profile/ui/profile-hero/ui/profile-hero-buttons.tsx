"use client";

import { UserQueries } from "@/entities/user";
import { CheckAutWrapper } from "@/features/auth/check-auth";
import { FollowButton } from "@/features/profile/follow-profile";
import { Button } from "@/shared/ui/button";
import { Row } from "@/shared/ui/layout";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroButtons({ userId, username }: { userId: string; username: string }) {
  const [mounted, setMounted] = useState(false);
  const { data: user } = useQuery(UserQueries.getMe());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
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
