import { getProfileById } from "@/entities/profile/server";
import type { Metadata } from "next";
import { ProfileLayout } from "@/views/profile";

export async function generateMetadata(
  props: LayoutProps<"/profile/[username]">,
): Promise<Metadata> {
  const { username } = await props.params;
  const profile = await getProfileById(username);
  const displayName = profile.author.displayName || profile.author.username;

  return {
    title: {
      default: `${displayName}`,
      template: `%s | ${displayName}`,
    },
    description: profile.bio || `Профиль ${displayName} в IT Blog.`,
    alternates: {
      canonical: `/profile/${username}`,
    },
    openGraph: {
      title: displayName,
      description: profile.bio || `Профиль ${displayName} в IT Blog.`,
      url: `/profile/${username}`,
    },
  };
}

export default ProfileLayout;
