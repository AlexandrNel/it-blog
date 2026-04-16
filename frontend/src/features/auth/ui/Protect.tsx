"use server";
import { notFound, redirect } from "next/navigation";
import { auth } from "../api/server";

type ProtectProps = {
	children: React.ReactNode;
	redirectTo?: string;
	permittedRoles?: string[];
};

export async function Protect({ children, redirectTo, permittedRoles }: ProtectProps) {
	const { isAuthenticated, role } = await auth();
	if (!isAuthenticated) {
		redirect(redirectTo || "/login");
	}
	if (permittedRoles && role && permittedRoles.includes(role)) {
		return children;
	} else notFound();
}
