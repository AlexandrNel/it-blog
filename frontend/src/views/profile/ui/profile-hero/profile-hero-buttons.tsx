"use client";

import { type TUser, useUser } from "@/entities/user";
import { CheckAutWrapper } from "@/features/auth/check-auth";
import { FollowButton } from "@/features/profile/follow-profile";
import { Button } from "@/shared/ui/button";
import { Row } from "@/shared/ui/layout";
import Link from "next/link";

export function HeroButtons({ author: { id, username } }: { author: TUser.Author }) {
  const { data: user } = useUser();

  return (
    <Row justify={"end"}>
      {user?.id === id ? (
        <Button asChild>
          <Link href="/settings">
            Редактировать <span className="md:block hidden">профиль</span>
          </Link>
        </Button>
      ) : (
        <CheckAutWrapper>
          <FollowButton userId={id} username={username} />
        </CheckAutWrapper>
      )}
    </Row>
  );
}
