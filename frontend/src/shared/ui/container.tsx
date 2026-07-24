import { classNames } from "../lib/utils";
import type { BasePropsWithChildren } from "../types/components";

export const Container = ({ children, className }: BasePropsWithChildren) => {
  return <div className={classNames("container", {}, [className])}>{children}</div>;
};
