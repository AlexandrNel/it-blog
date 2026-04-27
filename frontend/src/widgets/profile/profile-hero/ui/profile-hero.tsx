import { getProfileById } from "@/entities/profile";
import Link from "next/link";
import { UserCard } from "@/entities/user";
import { Card } from "@/shared/ui/card";
import { Row, Column } from "@/shared/ui/layout/";
import { cacheLife, cacheTag } from "next/cache";
import { Button } from "@/shared/ui/button";
import { FollowButton } from "@/features/profile/follow-profile";
import { ProfileConnectionsActions } from "@/features/profile/profile-connections";

export async function ProfileHero({ userId, isOwner }: { userId: string; isOwner: boolean }) {
	"use cache";
	cacheLife("days");
	cacheTag("profile", userId);
	const { author, bio } = await getProfileById(userId);

	return (
		<Card>
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
							<FollowButton userId={author.id} />
						)}
					</Row>
				</Row>
				<p>{bio}</p>
				<ProfileConnectionsActions userId={userId} />
			</Column>
		</Card>
	);
}
