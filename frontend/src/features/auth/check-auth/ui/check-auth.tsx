import { auth } from "@/entities/auth/api/server";
import { redirect } from "next/navigation";

export async function CheckAuth({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = await auth();
	if (!isAuthenticated) {
		redirect("/login");
	}

	return children;
}
