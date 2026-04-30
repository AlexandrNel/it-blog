import { CheckAuth } from "@/features/auth/check-auth/ui/check-auth";
import { Suspense } from "react";
export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<Suspense fallback={null}>
			<CheckAuth>{children}</CheckAuth>
		</Suspense>
	);
}
