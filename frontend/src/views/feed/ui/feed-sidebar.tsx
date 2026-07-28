import { env } from "@/shared/config";
import { DemoInfo } from "@/widgets/demo";
import { PopularTags } from "@/widgets/popular-tags";

export function FeedSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <PopularTags />
      {env.NEXT_PUBLIC_DEMO && <DemoInfo />}
    </div>
  );
}
