import { applyApiFieldErrors } from "./apply-api-field-errors";

export function createHandleSubmit<FormValues, Response = unknown>(
  setError: (name: keyof FormValues, error: { type: string; message?: string }) => void,
  callback: (values: FormValues) => Promise<Response>,
) {
  return async (values: FormValues) => {
    try {
      await callback(values);
    } catch (error) {
      applyApiFieldErrors<FormValues>(error, setError);
    }
  };
}
