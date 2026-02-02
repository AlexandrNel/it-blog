import { MainPage } from "@/views/main";
import { PageLayout } from "../layouts/PageLayout";
import { TagsWidget, Sidebar } from "@/widgets/Sidebar";

export default async function Page() {
	return (
		<PageLayout sidebar={<Sidebar widgets={<TagsWidget />} />}>
			<MainPage />
		</PageLayout>
	);
}
