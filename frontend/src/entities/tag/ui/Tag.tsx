import { cn } from "@/shared/lib/utils";
type Props = { value: string; className?: string };
export function Tag({ value, className }: Props) {
  return (
    <span
      className={cn(
        className,
        "hover:bg-muted  border-transparent border relative z-5 rounded-sm block px-2 py-0.5 text-sm  text-foreground transition-all",
      )}
    >
      {value}
    </span>
  );
}
