import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type PropsWithChildren } from "react";

const variants = cva("text-sm cursor-pointer transition", {
  variants: {
    variant: {
      default: "text-muted-foreground hover:text-foreground",
      primary: "text-primary hover:text-primary/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = {
  onClick?: () => void;
  asChild?: boolean;
} & VariantProps<typeof variants>;

export const CommentButton = ({
  children,
  asChild,
  onClick,
  variant = "default",
}: PropsWithChildren<Props>) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(variants({ variant }))}
      onClick={onClick}
      type="button"
    >
      {children}
    </Comp>
  );
};
