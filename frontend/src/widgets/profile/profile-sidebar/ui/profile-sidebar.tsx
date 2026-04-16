import { getProfileById } from "@/entities/profile";
import { Card } from "@/shared/ui/card";
import { GitHubIcon } from "@/shared/ui/icons";
import { Column, Row } from "@/shared/ui/layout";
import { Globe, Mail, Send } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import type { ReactNode } from "react";

export async function ProfileSidebar({ userId }: { userId: string }) {
	"use cache";
	cacheLife("days");
	cacheTag("profile", userId);
	const { contacts } = await getProfileById(userId);
	return (
		<Card>
			<Column gap={"lg"}>
				<Column gap={"sm"}>
					<h2 className="text-xl font-bold">О профиле</h2>
					<p className="text-muted-foreground leading-tight">
						Краткая информация и публичные ссылки автора
					</p>
				</Column>
				{contacts && (
					<Column gap={"sm"}>
						{contacts?.site && (
							<Row>
								<Globe size={16} />
								<Link target="_blank" href={contacts.site}>
									{contacts.site}
								</Link>
							</Row>
						)}
						{contacts?.email && (
							<Row>
								<Mail size={16} />
								<span>{contacts.email}</span>
							</Row>
						)}
					</Column>
				)}

				{contacts?.links && (
					<Row className="flex-wrap">
						{contacts?.links?.github && (
							<ProfileLinkItem link={contacts.links.github} label="GitGub" icon={<GitHubIcon />} />
						)}
						{contacts?.links?.telegram && (
							<ProfileLinkItem
								link={contacts.links.telegram}
								label="Telegram"
								icon={<Send size={16} />}
							/>
						)}
					</Row>
				)}
			</Column>
		</Card>
	);
}

function ProfileLinkItem({ label, icon, link }: { link: string; label: string; icon?: ReactNode }) {
	return (
		<Link
			target="_blank"
			className="bg-secondary py-1 px-2 rounded-full transition-all text-muted-foreground [&_svg]:text-muted-foreground hover:text-foreground hover:[&_svg]:text-foreground"
			href={link}
		>
			<Row>
				{icon}
				{label}
			</Row>
		</Link>
	);
}
