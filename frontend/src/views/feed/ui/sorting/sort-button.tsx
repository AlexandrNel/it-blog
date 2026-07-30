import { classNames } from "@/shared/lib/utils";
import type { ComponentProps } from "react";

type SortButtonProps = { isActive: boolean } & ComponentProps<"button">;

export function SortButton({ isActive, className, children, ...props }: SortButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "cursor-pointer text-muted-foreground h-10  border-gray-300 px-4 rounded-full transition-colors hover:text-foreground hover:border-gray-300 active:text-foreground active:bg-card active:border-gray-300 disabled:opacity-60",
        { "bg-card text-foreground border-gray-500": isActive },
        [className],
      )}
      {...props}
    >
      {children}
    </button>
  );
}
