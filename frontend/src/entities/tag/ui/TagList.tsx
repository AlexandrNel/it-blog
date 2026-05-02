import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Tag } from "./Tag";
import type { Tag as TypeTag } from "../model/tag";

interface Props {
	className?: string;
	list: TypeTag[];
}

export function TagList({ className, list }: Props) {
	return (
		<ul className={cn(className, "flex flex-wrap gap-2 relative z-10")}>
			{list.map((tag) => (
				<li key={tag.key}>
					<Link href={`/tags/${tag.key}`}>
						<Tag value={tag.name} />
					</Link>
				</li>
			))}
		</ul>
	);
}
