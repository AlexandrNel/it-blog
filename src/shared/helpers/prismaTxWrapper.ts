import type { DefaultArgs } from "@prisma/client/runtime/client";
import type { PrismaClient } from "~/generated/prisma/client.js";
import { prisma } from "~/shared/lib/prisma.js";
export function PrismaTxWrapper<T, Data>(
  func: (
    client:
      | typeof prisma
      | Omit<
          PrismaClient<never, undefined, DefaultArgs>,
          "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
        >,
    args: Data,
  ) => Promise<T>,
) {
  return function (
    args: Data,
    client?:
      | typeof prisma
      | Omit<
          PrismaClient<never, undefined, DefaultArgs>,
          "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
        >,
  ) {
    const prismaClient = client ?? prisma;
    return func(prismaClient, args);
  };
}
