import type { PropsWithChildren } from "react";
import { Card } from "../card";

type Props = { message?: string };

export function EmptyCard({ message, children }: PropsWithChildren<Props>) {
  return (
    <Card className="py-5">
      <h2 className="font-medium text-center">Кажется здесь ничего нет</h2>
      {message && <p>{message}</p>}
      {children}
    </Card>
  );
}
