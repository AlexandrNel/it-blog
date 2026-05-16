"use client";
import { useDeletePost } from "@/entities/article";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeletePostButton({ id }: { id?: string }) {
	const router = useRouter();
	const mutation = useDeletePost();
	if (!id) return null;
	const handleDelete = () => {
		if (confirm("Вы уверены, что хотите удалить статью?")) {
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
			type="button"
			variant={"destructive"}
			onClick={handleDelete}
		>
			Удалить статью
		</Button>
	);
}
