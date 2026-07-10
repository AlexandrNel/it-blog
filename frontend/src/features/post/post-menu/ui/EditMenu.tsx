"use client";
import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types/components";
import { EllipsisVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { routes } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "@/entities/user";
import { type PropsWithChildren, useLayoutEffect, useState } from "react";

interface Props extends BaseProps {
  slug: string;
  authorId: string;
}

export function EditMenu({ className, authorId, slug }: Props) {
  const [mounted, setMounted] = useState(false);
  const { data: user } = useQuery(UserQueries.getMe());

  useLayoutEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (user?.id !== authorId) return null;

  return (
    <div className={cn(className, `flex gap-2 rounded absolute z-10 top-0 right-0 w-min`)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon-sm"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="p-0">
              <Link href={routes.editor.post(slug)} className=" cursor-pointer flex px-2 py-1 gap-2">
                <Pencil size={20} color="#858585" strokeWidth={2} />
                Редактировать
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
