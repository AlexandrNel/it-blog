export default function NotFoundPage() {
  return (
    <div className="container grow h-full flex items-center justify-center">
      <div>
        <h2 className="text-5xl font-bold">Ошибка 404</h2>
        <h3 className="text-2xl font-bold mb-3">Что происходит?</h3>
        <p>По этой ссылке у нас ничего нет</p>
        <p>Проверьте, нет ли в адресе лишних букв</p>
      </div>
    </div>
  );
}
