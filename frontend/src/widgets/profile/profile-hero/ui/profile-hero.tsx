import { getProfileById } from "@/entities/profile/index.server";
import Link from "next/link";
import { UserCard } from "@/entities/user";
import { Card } from "@/shared/ui/card";
import { Row, Column } from "@/shared/ui/layout/";
import { cacheLife, cacheTag } from "next/cache";
import { Button } from "@/shared/ui/button";
import { ProfileConnectionsActions } from "@/features/profile/profile-connections";
import { FollowButton } from "@/features/profile/follow-profile";
import { CheckAuthButton } from "@/entities/auth";
import { Suspense } from "react";

type Props = { userId: string; isOwner: boolean };

export async function _ProfileHero({ userId, isOwner }: Props) {
	"use cache";
	cacheLife("days");
	cacheTag("profile", userId);
	const { author, bio } = await getProfileById(userId);

	return (
		<Card className="max-md:-mx-(--container-padding) max-md:rounded-none">
			<Column className="gap-3">
				<Row justify={"between"}>
					<UserCard
						data={{
							fullName: author.displayName,
							username: author.username,
							avatarUrl: author.avatar,
							date: "",
						}}
					/>
					<Row>
						{isOwner ? (
							<Button asChild>
								<Link href="/settings">Редактировать профиль</Link>
							</Button>
						) : (
							<CheckAuthButton>
								<FollowButton userId={author.id} />
							</CheckAuthButton>
						)}
					</Row>
				</Row>
				<p>{bio}</p>
				<ProfileConnectionsActions userId={userId} />
			</Column>
		</Card>
	);
}

export const ProfileHero = (props: Props) => {
	return (
		<Suspense>
			<_ProfileHero {...props} />
		</Suspense>
	);
};
