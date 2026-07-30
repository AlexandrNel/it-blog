import { getProfileStatisticByUserId } from "@/entities/profile/server";
import { Card, CardContent } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { ProfileTabList } from "./profile-tab-list";

type Props = { username: string };

export async function ProfileTabs({ username }: Props) {
  const stats = await getProfileStatisticByUserId(username);

  return (
    <Card className="max-md:-mx-(--container-padding) max-lg:rounded-t-none max-md:rounded-none max-md:mb-2">
      <CardContent>
        <Row className="flex-nowrap overflow-auto">
          <ProfileTabList statistic={stats} username={username} />
        </Row>
      </CardContent>
    </Card>
  );
}
