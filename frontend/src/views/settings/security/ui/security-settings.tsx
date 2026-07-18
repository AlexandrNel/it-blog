import { Card } from "@/shared/ui/card";
import { SecurityForm } from "./security-form";
import { ErrorBoundary } from "@/shared/layouts";
import { ErrorSubPage } from "@/views/error";

export function SecuritySettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <ErrorBoundary fallback={ErrorSubPage}>
        <h2 className="text-lg font-semibold">Безопасность</h2>
        <SecurityForm />
      </ErrorBoundary>
    </Card>
  );
}
