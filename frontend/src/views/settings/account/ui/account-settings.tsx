import { Card } from "@/shared/ui/card";
import { AccountForm } from "@/widgets/settings/account-form";

export default function SettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Настройки аккаунта</h2>
      <AccountForm />
    </Card>
  );
}
