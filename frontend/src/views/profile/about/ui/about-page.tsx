import { ProfileInfo } from "../../ui/profile-info";

export default async function AboutPage({ params }: PageProps<"/profile/[username]/about">) {
  const { username } = await params;
  return <ProfileInfo userId={username} />;
}
