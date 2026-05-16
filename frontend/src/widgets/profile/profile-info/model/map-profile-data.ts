import type { ProfileContact, Profile as ProfileInput } from "@/entities/profile";

const contactKeys = ["site", "email"] as const;
type ContactType = (typeof contactKeys)[number];

type SocialType = keyof NonNullable<ProfileContact["links"]>;

export type ProfileItem =
	| { type: ContactType; value: string }
	| { type: SocialType; value: string };

export type ProfileOutput = {
	contacts: ProfileItem[];
};

export const mapProfileData = ({ contacts }: Pick<ProfileInput, "contacts">): ProfileOutput => {
	const result: ProfileItem[] = [];

	if (!contacts) {
		return { contacts: [] };
	}

	const { links, ...rest } = contacts;

	for (const key of contactKeys) {
		const value = rest[key];

		if (!value) continue;

		result.push({
			type: key,
			value: String(value),
		});
	}

	if (links) {
		for (const key in links) {
			const typedKey = key as SocialType;
			const value = links[typedKey];

			if (!value) continue;

			result.push({
				type: typedKey,
				value: String(value),
			});
		}
	}

	return {
		contacts: result,
	};
};
