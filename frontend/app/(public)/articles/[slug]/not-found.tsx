import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="rounded-lg h-full flex items-center justify-center">
      <div>
        <h2 className="text-5xl font-bold">Ошибка 404</h2>
        <h3 className="text-2xl font-bold mb-3">Статья не найдена</h3>
        <p>По этой ссылке у нас ничего нет</p>
        <p className="mb-2">Проверьте, нет ли в адресе лишних букв</p>
        <Button asChild>
          <Link href={"/"}>Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  );
}
