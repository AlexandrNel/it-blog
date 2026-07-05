import { CheckAuth } from "@/features/auth/check-auth/ui/check-auth";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<Suspense fallback={null}>
			<CheckAuth>{children}</CheckAuth>
		</Suspense>
	);
}
