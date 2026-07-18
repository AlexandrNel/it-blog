"use client";

import { FieldDescription, FormField, Item, ItemContent, Skeleton } from "@/shared/ui";

export function AccountFormSkeleton() {
  return (
    <Item className="p-0 border-0">
      <ItemContent className="flex flex-col gap-4">
        <FormField label="Никнейм">
          <FieldDescription>
            Уникальное имя, которое будет использоваться для идентификации вашего аккаунта и
            отображаться в вашем профиле
          </FieldDescription>
          <div className="flex gap-2">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-11" />
          </div>
        </FormField>

        <Skeleton className="h-10 w-[107px] rounded-md" />
      </ItemContent>
    </Item>
  );
}
