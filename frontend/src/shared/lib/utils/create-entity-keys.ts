export const createEntityKeys = <
  T extends string,
  Extra extends Record<string, (...args: never[]) => readonly unknown[]>,
  ExtraMapped extends Record<
    keyof Extra,
    (...args: Parameters<Extra[keyof Extra]>) => ReturnType<Extra[keyof Extra]>
  > = {
    [K in keyof Extra]: (...args: Parameters<Extra[K]>) => ReturnType<Extra[K]>;
  },
>(
  entity: T,
  extra?: Extra,
) => {
  const root = entity;

  const base = {
    list: (filters?: string | string[]) => {
      const arr = [root, "list"];
      if (filters) {
        arr.push(...(Array.isArray(filters) ? filters : [filters]));
      }
      return arr;
    },
    detail: (id: number | string) => [root, "detail", id] as const,
    create: () => [root, "create"] as const,
    update: () => [root, "update"] as const,
    remove: () => [root, "remove"] as const,
  };

  return { ...base, ...((extra ? extra : {}) as ExtraMapped) };
};
