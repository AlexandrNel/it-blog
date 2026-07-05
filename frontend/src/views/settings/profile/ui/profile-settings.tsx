import { Card } from "@/shared/ui/card";
import { ProfileForm } from "@/widgets/settings/profile-form";

export default function SettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Профиль</h2>
      <ProfileForm />
    </Card>
  );
}
