import { getProfileById } from "@/entities/profile/index.server";
import { Card } from "@/shared/ui/card";
import { GitHubIcon } from "@/shared/ui/icons";
import { Column } from "@/shared/ui/layout";
import { Globe, Mail, Send } from "lucide-react";
import Link from "next/link";
import type { JSX, ReactNode } from "react";
import { mapProfileData, type ProfileItem } from "../model/map-profile-data";

const renderMap = {
	email: (value: string) => (
		<PublicLink key={value} label={value} link={`mailto:${value}`} icon={<Mail size={16} />} />
	),

	site: (value: string) => (
		<PublicLink key={value} link={value} label={value} icon={<Globe size={16} />} />
	),

	github: (value: string) => (
		<SocialLink key={value} label="GitHub" link={value} icon={<GitHubIcon />} />
	),

	telegram: (value: string) => (
		<SocialLink key={value} label="Telegram" link={value} icon={<Send size={16} />} />
	),
} satisfies Record<ProfileItem["type"], (value: string) => JSX.Element>;

export async function ProfileInfo({ userId }: { userId: string }) {
	const { contacts } = await getProfileById(userId);
	const data = mapProfileData({ contacts });
	return <ProfileInfoView data={data.contacts} />;
}

function ProfileInfoView({ data }: { data: ProfileItem[] }) {
	return (
		<Card>
			<h2 className="max-lg:text-base mb-1">О профиле</h2>
			{data.length ? (
				<Column gap={"sm"}>
					<p className="text-muted-foreground  max-md:text-sm leading-tight mb-1.5">
						Краткая информация и публичные ссылки автора
					</p>
					{data.map((item) => renderMap[item.type](item.value))}
				</Column>
			) : (
				<p>Профиль не настроен</p>
			)}
		</Card>
	);
}

function PublicLink({ link, icon, label }: { link: string; label: string; icon?: ReactNode }) {
	return (
		<Link target="_blank" href={link} className="flex items-center gap-2">
			{icon}
			{label}
		</Link>
	);
}

function SocialLink({ label, icon, link }: { link: string; label: string; icon?: ReactNode }) {
	return (
		<Link
			target="_blank"
			className="bg-secondary py-1 px-2 rounded-full transition-all text-muted-foreground [&_svg]:text-muted-foreground hover:text-foreground hover:[&_svg]:text-foreground flex items-center gap-2"
			href={link}
		>
			{icon}
			{label}
		</Link>
	);
}
