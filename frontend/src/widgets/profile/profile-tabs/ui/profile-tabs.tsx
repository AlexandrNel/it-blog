import { getProfileStatisticById } from "@/entities/profile";
import { Card } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { TabItem } from "./profile-tab-item";

type LinkItem = {
  label: string;
  path: string;
};

const LINKS = {
  POSTS: { label: "Статьи", path: "" },
  COMMENTS: { label: "Комментарии", path: "/comments" },
};

type LinksKey = keyof typeof LINKS;

export async function Tabs({ userId }: { userId: string }) {
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
          return (
            <TabWithCount
              key={key}
              data={{ ...value, label }}
              userId={userId}
            />
          );
        })}
      </Row>
    </Card>
  );
}

const TabWithCount = async ({
  userId,
  data,
}: {
  userId: string;
  data: LinkItem;
}) => {
  return <TabItem text={data.label} href={`/profile/${userId}${data.path}`} />;
};
