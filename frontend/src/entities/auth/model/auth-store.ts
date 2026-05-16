import { create } from "zustand";
import { getUser, type User } from "@/entities/user";
import { AuthAPI } from "../api/client";

interface AuthStore {
	user: User | null;
	setUser: (user: User) => void;
	removeUser: () => void;
	fetchUser: () => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
	user: null,
	fetchUser: async () => {
		try {
			const user = await getUser();
			set({ user });
		} catch {}
	},
	logout: async () => {
		if (confirm("Вы уверены, что хотите выйти?")) {
			try {
				await AuthAPI.logout();
				set({ user: null });
				window.location.reload();
			} catch {}
		}
	},
	setUser: (user: User | null) => set({ user }),
	removeUser: () => set({ user: null }),
}));
