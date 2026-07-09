import { ProfileInfo } from "../../ui/profile-info";

export default async function AboutPage({ params }: PageProps<"/profile/[id]">) {
  const id = (await params).id;
  return <ProfileInfo userId={id} />;
}
