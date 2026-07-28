import { DemoInfo } from "@/widgets/demo";
import { PopularTags } from "@/widgets/popular-tags";

export function FeedSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <PopularTags />
      <DemoInfo />
    </div>
  );
}
