import { auth } from "@/entities/auth/api/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function CheckAuth({ children }: { children: React.ReactNode }) {
	const cookie = await cookies();
	const { isAuthenticated } = await auth(cookie);
	if (!isAuthenticated) {
		redirect("/login");
	}

	return children;
}
