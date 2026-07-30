import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const headingVariants = cva("font-bold", {
  variants: {
    size: {
      1: "text-2xl",
      2: "text-2xl",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base",
    },
  },
  defaultVariants: {
    size: 1,
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingOwnProps<T extends ElementType> = {
  as?: T;
  level?: HeadingLevel; // семантический уровень → тег
  size?: HeadingLevel; // визуальный размер → стили
};

type HeadingProps<T extends ElementType = "h1"> = HeadingOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeadingOwnProps<T>>;

export const Heading = <T extends ElementType = "h1">({
  as,
  level = 1,
  size,
  className,
  children,
  ...props
}: HeadingProps<T>) => {
  const Tag = (as ?? `h${level}`) as ElementType;

  return (
    <Tag className={headingVariants({ size: size ?? level, className })} {...props}>
      {children}
    </Tag>
  );
};
