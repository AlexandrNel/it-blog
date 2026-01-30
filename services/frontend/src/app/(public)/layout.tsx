import { Sidebar } from "@/widgets/Sidebar";
import { PageLayout } from "../layouts/PageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <PageLayout sidebar={<Sidebar />}>{children}</PageLayout>;
}
