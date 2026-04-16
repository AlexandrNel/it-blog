"use server";

import { updateTag } from "next/cache";

export const updateProfile = async () => {
	updateTag("profile");
};
