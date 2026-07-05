import { Card } from "@/shared/ui/card";
import { SecurityForm } from "@/widgets/settings/security-form";

export default function SettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Безопасность</h2>
      <SecurityForm />
    </Card>
  );
}
