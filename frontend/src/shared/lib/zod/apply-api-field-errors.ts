import { getFieldErrors } from "../api/get-field-errors";

export function applyApiFieldErrors<FormValues>(
	error: unknown,
	setError: (name: keyof FormValues, error: { type: string; message?: string }) => void,
) {
	const fieldErrors = getFieldErrors(error);

	if (!fieldErrors) return;

	(Object.entries(fieldErrors) as [keyof FormValues, string | string[]][]).forEach(
		([field, message]) => {
			const msg = Array.isArray(message) ? message[0] : message;
			setError(field, { type: "server", message: msg });
		},
	);
}
