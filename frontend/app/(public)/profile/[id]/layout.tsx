import { getProfileById } from "@/entities/profile/server";
import { type Metadata } from "next";
import { ProfileLayout } from "@/views/profile";

export async function generateMetadata(props: LayoutProps<"/profile/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const profile = await getProfileById(id);
  const displayName = profile.author.displayName || profile.author.username;

  return {
    title: {
      default: `${displayName}`,
      template: `%s | ${displayName}`,
    },
    description: profile.bio || `Профиль ${displayName} в IT Blog.`,
    alternates: {
      canonical: `/profile/${id}`,
    },
    openGraph: {
      title: displayName,
      description: profile.bio || `Профиль ${displayName} в IT Blog.`,
      url: `/profile/${id}`,
    },
  };
}

export default ProfileLayout;
