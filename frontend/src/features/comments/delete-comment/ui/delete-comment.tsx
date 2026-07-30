"use client";
import { CommentButton } from "@/entities/comment";
import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useUser } from "@/entities/user";
import { useDeleteComment } from "../api/mutations";

export const DeleteCommentButton = memo(
  ({ commentId, userId }: { commentId: string; userId: string }) => {
    const { data: user } = useUser();

    const { mutate } = useDeleteComment({
      onError: () => {
        toast.error("Не удалось удалить комментарий");
      },
      onSuccess: () => {
        toast.success("Комментарий удален");
      },
    });
    if (!user || user.id !== userId) return null;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <CommentButton>Удалить</CommentButton>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Удаление комментария</DialogTitle>
          <DialogDescription>Вы уверены, что хотите удалить этот комментарий?</DialogDescription>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                mutate(commentId);
              }}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
