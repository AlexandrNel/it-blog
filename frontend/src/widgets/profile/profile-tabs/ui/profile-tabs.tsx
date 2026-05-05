import { getProfileStatisticById } from "@/entities/profile/index.server";
import { Card } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { TabItem } from "./profile-tab-item";
import { Suspense } from "react";
import { ProfileTabsSkeleton } from "./profile-tabs-skeleton";

type LinkItem = {
	label: string;
	path: string;
	isMobile?: boolean;
};

type LinkKey = "POSTS" | "COMMENTS" | "PROFILE";

const LINKS: Record<LinkKey, LinkItem> = {
	POSTS: { label: "Статьи", path: "" },
	COMMENTS: { label: "Комментарии", path: "/comments" },
	PROFILE: { label: "Профиль", path: "/about", isMobile: true },
};

type Props = { userId: string };

export async function _Tabs({ userId }: Props) {
	const stats = await getProfileStatisticById(userId);
	const statsMap: Record<LinkKey, string> = {
		POSTS: stats?.publishedPosts.toString() ?? "",
		COMMENTS: stats?.comments.toString() ?? "",
		PROFILE: "",
	};
	return (
		<Card className="max-md:-mx-(--container-padding) max-md:rounded-none max-md:mb-2">
			<Row className="flex-nowrap overflow-auto">
				{Object.entries(LINKS).map(([key, value]) => {
					const label = `${value.label} ${statsMap[key as LinkKey]}`;
					return (
						<TabItem
							className={value.isMobile ? "lg:hidden" : ""}
							key={key}
							text={label}
							href={`/profile/${userId}${value.path}`}
						/>
					);
				})}
			</Row>
		</Card>
	);
}

export const Tabs = (props: Props) => {
	return (
		<Suspense fallback={<ProfileTabsSkeleton />}>
			<_Tabs {...props} />
		</Suspense>
	);
};
