import type { ProfileMetaInfo } from "@/entities/profile";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Column } from "@/shared/ui/layout";
import { Ban, Lock } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

export function ProfileVisibility({
	meta,
	children,
}: PropsWithChildren<{ meta: ProfileMetaInfo }>) {
	if (meta.isBlocked)
		return (
			<ProfileVisibilityCard
				icon={
					<div className="size-20 flex items-center justify-center rounded-full">
						<Ban color="red" size={50} />
					</div>
				}
				title={meta.isOwner ? "Ваш аккаунт заблокирован" : "Пользователь заблокирован"}
				description="Профиль пользователя недоступен в связи с нарушением правил сообщества."
			/>
		);
	if (!meta.isPublic)
		return (
			<ProfileVisibilityCard
				icon={
					<div className="size-20 flex items-center justify-center rounded-full bg-muted">
						<Lock />
					</div>
				}
				title="Профиль скрыт"
				description="Пользователь ограничил доступ к своей странице. Информация о профиле, статьях и
						активности доступна только владельцу аккаунта."
			/>
		);

	return children;
}

function ProfileVisibilityCard({
	icon,
	title,
	description,
}: {
	icon: ReactNode;
	title: string;
	description: string;
}) {
	return (
		<Card>
			<Column align={"center"}>
				{icon}
				<Column align={"center"}>
					<h1 className="text-2xl font-bold">{title}</h1>
					<p className="text-center md:max-w-[60%]">{description}</p>
				</Column>
				<Button asChild>
					<Link href={"/"}>Вернуться на главную</Link>
				</Button>
			</Column>
		</Card>
	);
}
