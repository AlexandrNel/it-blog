import { getProfileById } from "@/entities/profile/index.server";
import Link from "next/link";
import { UserAvatar, UserCard } from "@/entities/user";
import { Card } from "@/shared/ui/card";
import { Row, Column } from "@/shared/ui/layout/";
import { cacheLife, cacheTag } from "next/cache";
import { Button } from "@/shared/ui/button";
import { ProfileConnectionsActions } from "@/features/profile/profile-connections";
import { FollowButton } from "@/features/profile/follow-profile";
import { CheckAuthButton } from "@/entities/auth";
import { Suspense } from "react";
import { ProfileCover } from "./profile-cover";
import { ProfileUserCard } from "./profile-user-card";

type Props = { userId: string; isOwner: boolean };

export async function _ProfileHero({ userId, isOwner }: Props) {
	"use cache";
	cacheLife("days");
	cacheTag("profile", userId);
	const { author, bio } = await getProfileById(userId);

	return (
		<div>
			<ProfileCover className="max-md:-mx-(--container-padding) max-md:rounded-none " />
			<Card className="relative max-md:-mx-(--container-padding) max-md:rounded-none  max-md:border-b">
				<div className="bg-card p-1 rounded-full absolute -top-7.5 ">
					<UserAvatar
						className="size-15"
						avatarUrl={author.avatar}
						name={author.displayName || author.username}
					/>
				</div>
				<Column className="gap-3">
					<div>
						<Row justify={"end"}>
							{isOwner ? (
								<Button asChild>
									<Link href="/settings">
										Редактировать <span className="md:block hidden">профиль</span>
									</Link>
								</Button>
							) : (
								<CheckAuthButton>
									<FollowButton userId={author.id} />
								</CheckAuthButton>
							)}
						</Row>
						<ProfileUserCard user={author} />
					</div>
					<p>{bio}</p>
					<ProfileConnectionsActions userId={userId} />
				</Column>
			</Card>
		</div>
	);
}

export const ProfileHero = (props: Props) => {
	return (
		<Suspense>
			<_ProfileHero {...props} />
		</Suspense>
	);
};
