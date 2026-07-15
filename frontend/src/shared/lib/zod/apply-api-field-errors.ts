import { getFieldErrors } from "@/shared/api";
import { FieldValues, type FieldPath, type UseFormSetError } from "react-hook-form";

export function applyApiFieldErrors<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
  const fieldErrors = getFieldErrors(error);

  if (!fieldErrors) return;

  (Object.entries(fieldErrors) as [FieldPath<T>, string[]][]).forEach(([field, messages]) => {
    if (messages.length > 0) {
      setError(field, { type: "server", message: messages[0] });
    }
  });
}
