"use client";
import { useEffect } from "react";
import { useAuthStore } from "../model/auth-store";

export function GettingUser() {
	const { fetchUser } = useAuthStore();
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);
	return null;
}
