import { getProfileById } from "@/entities/profile/index.server";
import Link from "next/link";
import { UserAvatar } from "@/entities/user";
import { Row } from "@/shared/ui/layout/";
import { Button } from "@/shared/ui/button";
import { ProfileConnectionsActions } from "@/features/profile/profile-connections";
import { FollowButton } from "@/features/profile/follow-profile";
import { CheckAuthButton } from "@/entities/auth";
import { Suspense } from "react";
import { ProfileCover } from "./profile-cover";
import { ProfileUserCard } from "./profile-user-card";
import { ProfileHeroSkeleton } from "./profile-hero-skeleton";

type Props = { userId: string; isOwner: boolean };

export async function _ProfileHero({ userId, isOwner }: Props) {
  return (
    <section>
      <ProfileCover className="max-md:-mx-(--container-padding) max-md:rounded-none " />
      <div className="card relative max-md:-mx-(--container-padding) rounded-none max-md:rounded-none max-lg:border-b">
        <HeroInner data={{ userId, isOwner }} />
        <ProfileConnectionsActions className="md:mt-2 mt-1" userId={userId} />
      </div>
    </section>
  );
}

const HeroInner = async ({ data: { userId, isOwner } }: { data: Props }) => {
  const { author, bio } = await getProfileById(userId);
  return (
    <>
      <div className="bg-card p-1 rounded-full absolute -top-7.5 ">
        <UserAvatar
          className="size-15"
          avatarUrl={author.avatar}
          name={author.displayName || author.username}
        />
      </div>
      <Row justify={"end"}>
        {isOwner ? (
          <Button asChild>
            <Link href="/settings">
              Редактировать <span className="md:block hidden">профиль</span>
            </Link>
          </Button>
        ) : (
          <CheckAuthButton>
            <FollowButton userId={author.id} username={author.username} />
          </CheckAuthButton>
        )}
      </Row>
      <ProfileUserCard user={author} />
      {bio && <p className="md:mt-2 mt-1">{bio}</p>}
    </>
  );
};

export const ProfileHero = (props: Props) => {
  return (
    <Suspense fallback={<ProfileHeroSkeleton />}>
      <_ProfileHero {...props} />
    </Suspense>
  );
};
