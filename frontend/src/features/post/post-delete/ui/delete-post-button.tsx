"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeletePost, type UseDeletePostOptions } from "../api/use-delete-post";
import type { MouseEvent, ComponentProps } from "react";

type DeletePostButtonProps = {
  data: { id: string };
  mutateOptions?: UseDeletePostOptions;
} & ComponentProps<typeof Button>;

export function DeletePostButton({
  data: { id },
  disabled,
  type = "button",
  variant = "destructive",
  onClick,
  mutateOptions,
  children = "Удалить статью",
  ...props
}: DeletePostButtonProps) {
  const router = useRouter();
  const mutation = useDeletePost(mutateOptions);

  if (!id) return null;

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (confirm("Вы уверены, что хотите удалить статью?")) {
      onClick?.(e);
      mutation.mutate(id, {
        onError: () => toast.error("Не удалось удалить статью"),
        onSuccess: () => {
          toast.success("Статья успешно удалена");
          router.push("/");
        },
      });
    }
  };
  return (
    <Button
      disabled={mutation.isPending}
      type={type}
      variant={variant}
      onClick={handleDelete}
      {...props}
    >
      {children}
    </Button>
  );
}
