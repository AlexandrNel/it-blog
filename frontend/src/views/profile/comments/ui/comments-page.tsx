import { CommentButton, CommentCard } from "@/entities/comment";
import { getCommentsByUser } from "@/entities/comment/api/server";
import { EmptyCard } from "@/shared/ui/empty";
import Link from "next/link";

export default async function CommentsPage({
  params,
}: PageProps<"/profile/[id]">) {
  const id = (await params).id;
  const comments = await getCommentsByUser(id);
  console.log(comments);

  if (!comments || comments.length === 0) return <EmptyCard />;
  return comments?.map((c) => (
    <CommentCard className="card" key={c.id} comment={c}>
      <CommentButton asChild>
        <Link href={`/articles/${c.post.slug}#${c.id}`}>Посмотреть</Link>
      </CommentButton>
    </CommentCard>
  ));
}
