import type { PropsWithChildren } from "react";
import { Card, CardContent } from "../card";

type Props = { message?: string };

export function EmptyCard({ message, children }: PropsWithChildren<Props>) {
  return (
    <Card>
      <CardContent>
        <p className="font-medium text-center">Кажется здесь ничего нет</p>
        {message && <p>{message}</p>}
        {children}
      </CardContent>
    </Card>
  );
}
