import { ProfilePosts } from "../posts/ui/profile-posts";
import { ProfilePostsSkeleton } from "../posts/ui/profile-posts-skeleton";
import { Suspense } from "react";

export default async function ProfilePage({ params }: PageProps<"/profile/[id]">) {
  const param = await params;
  return (
    <Suspense fallback={<ProfilePostsSkeleton />}>
      <ProfilePosts userId={param.id} />
    </Suspense>
  );
}
