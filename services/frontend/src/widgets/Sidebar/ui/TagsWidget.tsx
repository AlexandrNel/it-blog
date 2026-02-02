// import { getTagList } from "@/entities/tag"; // TODO: uncomment
import { cn } from "@/shared/lib/utils";
import { TagList } from "@/shared/ui/TagList/TagList";
import { Suspense } from "react";

interface Props {
	className?: string;
}

export async function TagsWidget({ className }: Props) {
	return (
		<div className={cn(className)}>
			{/* // TODO : replace null with a skeleton */}
			<Suspense fallback={null}>
				<Tags />
			</Suspense>
		</div>
	);
}
async function Tags() {
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
	const tags = ["react", "javascript", "webdev"]; // TODO: await getTagList();
	return (
		<div className="bg-card rounded-lg p-3">
			<h2 className="mb-2">Популярные теги</h2>
			<TagList list={tags} />
		</div>
	);
}
