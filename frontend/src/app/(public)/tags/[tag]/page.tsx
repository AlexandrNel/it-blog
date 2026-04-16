import { TagsPage } from "@/views/tags";
import { Suspense } from "react";

export default async function Page({ params }: PageProps<"/tags/[tag]">) {
	return (
		<Suspense>
			<TagsPage params={params} />
		</Suspense>
	);
}
