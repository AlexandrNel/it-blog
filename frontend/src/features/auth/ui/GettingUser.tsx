"use client";
import { useEffect } from "react";
import { useAuthStore } from "../model/AuthStore";

export function GettingUser() {
	const { fetchUser } = useAuthStore();
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);
	return null;
}
