export type User = {
	id: string;
	email: string;
	avatar?: string;
	displayName: string;
	username: string;
	role: "USER" | "ADMIN" | "MODERATOR";
	createdAt: Date;
	updatedAt: Date;
};
