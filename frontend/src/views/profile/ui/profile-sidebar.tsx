import { ProfileInfo, ProfileInfoSkeleton } from "./profile-info";
import { Suspense } from "react";

export const ProfileSidebar = async ({ userId }: { userId: string }) => {
  return (
    <Suspense fallback={<ProfileInfoSkeleton />}>
      <ProfileInfo userId={userId} />
    </Suspense>
  );
};
