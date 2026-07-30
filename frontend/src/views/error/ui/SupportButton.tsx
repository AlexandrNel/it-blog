import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import type { Route } from "next";

interface Props extends BasePropsWithChildren {
  href: string;
}

export const SupportButton = ({ className, children, href }: Props) => {
  return (
    <ButtonGroup className={cn("items-center", className)}>
      <MessageSquareText size={20} color="#000000" strokeWidth={1} />
      <Button asChild variant={"link"} className="text-base pl-2">
        <Link href={href as Route}>{children}</Link>
      </Button>
    </ButtonGroup>
  );
};
