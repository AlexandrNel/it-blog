import { getProfileStatisticById } from "@/entities/profile";
import { Card } from "@/shared/ui/card";
import { Column, Grid } from "@/shared/ui/layout";
import { cacheLife, cacheTag } from "next/cache";

export async function ProfileHeroStats({ userId }: { userId: string }) {
	"use cache";
	cacheLife("minutes");
	cacheTag("profile", userId, "statistic");
	const stats = await getProfileStatisticById(userId);
	const unpublished = stats?.unpublishedPosts;
	const unpublishedText = Number(unpublished) > 0 ? `+${unpublished} (на модерации)` : "";

	return (
		<Card>
			<Grid>
				<StatChip text={`${unpublished ?? 0}`} subText={unpublishedText} label="статей" />
				<StatChip text={`${stats?.subscribers ?? 0}`} label="подписчиков" />
				<StatChip text={`${stats?.viewers ?? 0}`} label="просмотров" />
			</Grid>
		</Card>
	);
}

const StatChip = ({ text, subText, label }: { text: string; subText?: string; label: string }) => {
	return (
		<Column className="p-4 rounded-lg bg-muted">
			<p className="text-xl font-bold relative flex gap-1 items-center">
				{text}
				{subText && <span className="text-xs font-normal  left-3">{subText}</span>}
			</p>
			<span className="text-base text-muted-foreground">{label}</span>
		</Column>
	);
};
