export function getDirtyValues<T extends Record<string, any>>(values: T, dirtyFields: any): Partial<T> {
  const result: Partial<T> = {};

  (Object.keys(dirtyFields) as Array<keyof T>).forEach((key) => {
    const dirty = dirtyFields[key];
    const value = values[key];

    if (typeof dirty === "object" && !Array.isArray(dirty)) {
      const nested = getDirtyValues(value, dirty);
      if (Object.keys(nested).length > 0) {
        result[key] = nested as T[keyof T];
      }
    } else if (dirty === true) {
      result[key] = value;
    }
  });

  return result;
}
