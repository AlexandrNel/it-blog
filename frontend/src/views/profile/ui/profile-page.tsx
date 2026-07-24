import { ProfilePosts } from "../posts/ui/profile-posts";

export default async function ProfilePage({ params }: PageProps<"/profile/[username]">) {
  const { username } = await params;
  return <ProfilePosts username={username} />;
}
