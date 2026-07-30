import { Button } from "@/shared/ui/button";
import { useLogout, type UseLogoutOptions } from "../api/use-logout";
import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type LogoutButtonProps = React.ComponentProps<typeof Button> & { mutateOptions?: UseLogoutOptions };

export const LogoutButton = ({ onClick, asChild, mutateOptions, ...props }: LogoutButtonProps) => {
  const { mutate } = useLogout(mutateOptions);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      onClick?.(e);
      mutate();
    }
  };

  if (asChild) return <Slot onClick={handleClick} {...props} />;

  return <Button onClick={handleClick} {...props} />;
};
