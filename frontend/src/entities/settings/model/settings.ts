export type ProfileSettings = {
	displayName: string;
	bio?: string;
	location?: string;
	contacts?: {
		email?: string;
		site?: string;
		links?: {
			github?: string;
			telegram?: string;
		};
	};
};

export type AccountSettings = {
	username: string;
	email: string;
};

export type Settings = {
	profile: ProfileSettings;
	account: AccountSettings;
	meta: { emailVerified: boolean };
};
