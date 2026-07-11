import { classNames } from "@/shared/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("animate-pulse rounded-md bg-primary/10", {}, [className])} {...props} />;
}

export { Skeleton };
