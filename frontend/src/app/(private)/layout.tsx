import { CheckAuth } from "@/features/auth/ui/CheckAuth";
import { Suspense } from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<Suspense>
			<CheckAuth>{children}</CheckAuth>
		</Suspense>
	);
}
