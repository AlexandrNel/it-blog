import type { PropsWithChildren } from "react";
import { Card } from "../card";

type Props = { message?: string };

export function EmptyCard({ message, children }: PropsWithChildren<Props>) {
	return (
		<Card className="py-5">
			<p className="font-medium text-center">Кажется здесь ничего нет</p>
			{message && <p>{message}</p>}
			{children}
		</Card>
	);
}
