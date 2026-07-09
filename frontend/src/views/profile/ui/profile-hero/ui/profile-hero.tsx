import { getProfileById } from "@/entities/profile/index.server";
import { UserAvatar } from "@/entities/user";
import { ProfileConnectionsActions } from "@/features/profile/profile-connections";
import { ProfileCover } from "./profile-cover";
import { ProfileUserCard } from "./profile-user-card";
import { HeroButtons } from "./profile-hero-buttons";

type Props = { userId: string };

export async function ProfileHero({ userId }: Props) {
  const { author, bio } = await getProfileById(userId);
  return (
    <section>
      <ProfileCover className="max-md:-mx-(--container-padding) max-md:rounded-none " />
      <div className="card relative max-md:-mx-(--container-padding) rounded-none max-md:rounded-none max-lg:border-b">
        <div className="bg-card p-1 rounded-full absolute -top-7.5 ">
          <UserAvatar
            className="size-15"
            avatarUrl={author.avatar}
            name={author.displayName || author.username}
          />
        </div>
        <HeroButtons userId={author.id} username={author.username} />
        <ProfileUserCard user={author} />
        {bio && <p className="md:mt-2 mt-1">{bio}</p>}
        <ProfileConnectionsActions className="md:mt-2 mt-1" userId={userId} />
      </div>
    </section>
  );
}
