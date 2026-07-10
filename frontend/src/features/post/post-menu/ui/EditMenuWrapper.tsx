import { type ReactNode, type ComponentProps } from "react";
import { EditMenu } from "./EditMenu";
import { classNames } from "@/shared/lib/utils";

type EditMenuWrapperProps = {
  wrap?: Omit<ComponentProps<"div">, "children">;
  children: ReactNode;
} & ComponentProps<typeof EditMenu>;

export function EditMenuWrapper({ children, wrap: { className, ...rest } = {}, ...props }: EditMenuWrapperProps) {
  return (
    <div className={classNames("relative", {}, [className])} {...rest}>
      {children}
      <EditMenu {...props} />
    </div>
  );
}
