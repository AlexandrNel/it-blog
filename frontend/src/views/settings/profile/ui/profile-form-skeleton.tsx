import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">Имя или псевдоним</span>
          <Skeleton className="h-11 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">О себе</span>
          <Skeleton className="h-16 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">Откуда вы?</span>
          <Skeleton className="h-11 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">Веб сайт</span>
          <Skeleton className="h-11 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">Отображаемый email</span>
          <Skeleton className="h-11 w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">GitHub</span>
          <Skeleton className="h-11 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-medium leading-snug">Telegram</span>
          <Skeleton className="h-11 w-full" />
        </div>
      </div>

      <Skeleton className="h-10 w-28" />
    </div>
  );
}
