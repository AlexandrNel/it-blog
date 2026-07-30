import { Card } from "@/shared/ui/card";
import { SecurityForm } from "./security-form";

export function SecuritySettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Безопасность</h2>
      <SecurityForm />
    </Card>
  );
}
