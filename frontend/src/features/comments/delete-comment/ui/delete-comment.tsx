"use client";
import { CommentButton } from "@/entities/comment/ui/comment-button";
import { useAuthStore } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCommentAPI } from "../api/client";
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

export const DeleteCommentButton = memo(
  ({ commentId, userId }: { commentId: string; userId: string }) => {
    const user = useAuthStore((state) => state.user);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: DeleteCommentAPI.deleteComment,
      onError: () => {
        toast.error("Не удалось удалить комментарий");
      },
      onSuccess: () => {
        toast.success("Комментарий удален");
        queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
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
          <DialogDescription>
            Вы уверены, что хотите удалить этот комментарий?
          </DialogDescription>
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
