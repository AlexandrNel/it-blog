import { getProfileStatisticById } from "@/entities/profile/index.server";
import { Card } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { TabItem } from "./profile-tab-item";
import { Suspense } from "react";

type LinkItem = {
	label: string;
	path: string;
};

const LINKS = {
	POSTS: { label: "Статьи", path: "" },
	COMMENTS: { label: "Комментарии", path: "/comments" },
};

type LinksKey = keyof typeof LINKS;

type Props = { userId: string };

export async function _Tabs({ userId }: Props) {
	const stats = await getProfileStatisticById(userId);
	const statsMap = {
		POSTS: stats?.publishedPosts ?? "",
		COMMENTS: stats?.comments ?? "",
	};
	return (
		<Card>
			<Row className="flex-nowrap overflow-auto">
				{Object.entries(LINKS).map(([key, value]) => {
					const label = `${value.label} ${statsMap[key as LinksKey]}`;
					return <TabWithCount key={key} data={{ ...value, label }} userId={userId} />;
				})}
			</Row>
		</Card>
	);
}

const TabWithCount = async ({ userId, data }: { userId: string; data: LinkItem }) => {
	return <TabItem text={data.label} href={`/profile/${userId}${data.path}`} />;
};

export const Tabs = (props: Props) => {
	return (
		<Suspense>
			<_Tabs {...props} />
		</Suspense>
	);
};
