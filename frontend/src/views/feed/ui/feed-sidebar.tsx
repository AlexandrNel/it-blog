import { Column } from "@/shared/ui/layout";
import { PopularTags } from "@/widgets/popular-tags";

export function FeedSidebar() {
	return (
		<div className="flex  lg:flex-col gap-2">
			<PopularTags />
		</div>
	);
}
