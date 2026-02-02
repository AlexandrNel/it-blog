import { cn } from "@/shared/lib/utils";
type Props = { value: string; className?: string };
export const Tag = ({ value, className }: Props) => {
	return (
		<span
			className={cn(
				className,
				"bg-gray-500 rounded-sm block px-2 py-0.5 text-sm  text-white hover:bg-black transition-all",
			)}
		>
			{value}
		</span>
	);
};
