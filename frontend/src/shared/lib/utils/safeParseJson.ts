export function safeParseJson<T>(value: string | undefined | null): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {}
}
