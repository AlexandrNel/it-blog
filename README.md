# ✍️ IT Blog

Платформа для публикации IT-статей: лента, редактор, профили авторов, комментарии и поиск. Fullstack-пет-проект с разделением на API и SPA-подобный фронтенд на Next.js, готовый к деплою в Docker.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-alpine-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)

> 🚧 **Демо** и **скриншоты** появятся после деплоя — ссылку добавлю в этот раздел.

---

## 📑 Содержание

- [О проекте](#-о-проекте)
- [Возможности](#-возможности)
- [В разработке](#-в-разработке)
- [Стек](#-стек)
- [Быстрый старт](#-быстрый-старт)
- [Архитектура](#архитектура)
- [Структура репозитория](#-структура-репозитория)
- [Переменные окружения](#-переменные-окружения)
- [Скрипты](#-скрипты)
- [Что интересно в коде](#-что-интересно-в-коде)
- [Автор](#-автор)

---

## 📖 О проекте

**IT Blog** — это учебно-боевой pet-проект: полноценная платформа для технических статей с акцентом на UX редактора, SEO и предсказуемую серверную архитектуру.

Проект демонстрирует:

- проектирование REST API и схемы БД под реальные сценарии (посты, голоса, подписки, уведомления);
- современный фронтенд на **Next.js App Router** с серверными компонентами и кешированием;
- организацию кода по **Feature-Sliced Design** на клиенте и модульной структуре на сервере;
- production-ready деплой: **Docker Compose**, reverse proxy **Caddy**, HTTPS из коробки.

---

## ✨ Возможности

| Область            | Что реализовано                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **Статьи**         | Rich-text редактор (TipTap), превью, черновики и публикация, slug, категории и теги, просмотры            |
| **Лента и поиск**  | Главная с пагинацией, фильтры, страница поиска, лента по тегу                                             |
| **Комментарии**    | Древовидные ответы, редактирование, удалениие                                                             |
| **Профили**        | Публичная страница автора, «О себе», список комментариев, статей, подписки (follow)                       |
| **Аутентификация** | Регистрация, вход по email или username, JWT + refresh в cookie                                           |
| **Настройки**      | Аккаунт, профиль, безопасность                                                                            |
| **SEO**            | `metadata`, Open Graph, `sitemap.xml`, `robots.txt`, серверный эндпоинт для карты сайта                   |
| **Инфраструктура** | Rate limiting, дедупликация просмотров через Redis, загрузка изображений, роли (USER / MODERATOR / ADMIN) |

---

## 🛠️ В разработке

Ниже — план развития проекта. Список отражает текущие приоритеты и направления, над которыми ведётся работа.

- **Обложка профиля** – загрузка и редактирование баннера на странице автора.
- **Плавные анимации** – микроинтеракции и переходы между экранами без рывков в интерфейсе.
- **Уведомления в реальном времени** – доставка событий (подписки, ответы, голоса) через WebSocket или SSE; модель в БД уже заложена.
- **Личные сообщения** – чаты между пользователями.
- **Подсветка в поиске** – визуальное выделение совпадений в тексте статей на странице результатов.
- **Якорь на комментарий** – подсветка и прокрутка к нужному комментарию при переходе по прямой ссылке.
- **Админ-панель** – отдельное приложение для модераторов и администраторов: управление контентом, пользователями и ролями.
- **Права и доступы** – разграничить права и доступы между администраторами, модераторами, обычными пользователями и гостями.

---

## 🧰 Стек

### Frontend (`/frontend`)

| Технология                | Назначение                             |
| ------------------------- | -------------------------------------- |
| **Next.js 16**            | App Router, RSC, standalone-сборка     |
| **React 19**              | UI                                     |
| **TypeScript**            | Типизация                              |
| **Tailwind CSS 4**        | Стили                                  |
| **TanStack Query**        | Клиентский кеш и мутации               |
| **Zustand**               | Локальное состояние редактора          |
| **TipTap**                | WYSIWYG-редактор статей и комментариев |
| **React Hook Form + Zod** | Формы и валидация                      |
| **Biome**                 | Линтинг и форматирование               |

### Backend (`/backend`)

| Технология             | Назначение                       |
| ---------------------- | -------------------------------- |
| **Node.js + Express**  | REST API                         |
| **TypeScript**         | Типизация                        |
| **Prisma 7**           | ORM, миграции                    |
| **PostgreSQL 15**      | Основное хранилище               |
| **Redis**              | Кеш уникальных просмотров постов |
| **JWT + bcrypt**       | Аутентификация                   |
| **Zod**                | Валидация env и DTO              |
| **express-rate-limit** | Защита от злоупотреблений        |

### 🐳 DevOps

- **Docker** — multi-stage образы для frontend и backend
- **Docker Compose** — dev-инфра и production-стек
- **Caddy** — reverse proxy, TLS, маршрутизация `/api` → backend

---

## 🚀 Быстрый старт

### Требования

- [Docker](https://www.docker.com/) и Docker Compose (встроен в Docker Desktop)

### 1. Запуск

Из корня репозитория:

```bash
npm run dev
```

Docker Compose поднимет все сервисы:

| Сервис      | Адрес                       |
| ----------- | --------------------------- |
| Frontend    | http://localhost:3000       |
| Backend API | http://localhost:3005/api   |
| PostgreSQL  | `localhost:5432`            |
| Redis       | `localhost:6379`            |

Миграции Prisma выполняются автоматически при старте backend-контейнера.

### 2. Наполнение БД тестовыми данными

```bash
npm run dev:seed
```

Создаст: администратора, категории и теги.

### 3. Тестовый вход

| Поле   | Значение            |
| ------ | ------------------- |
| Email  | `admin@example.com` |
| Пароль | `admin123!`         |

> ⚠️ Используйте только в dev-окружении. Перед production смените пароль и секреты.

### 4. Остановка

```bash
npm run dev:down
```

Останавливает контейнеры и удаляет volumes (БД и Redis будут очищены).

---

## 🌐 Production-деплой

1. Скопируйте `.env.example` в `.env.prod` и заполните переменные.
2. Соберите и запустите стек:

```bash
npm run prod
```

Caddy поднимет HTTPS для `DOMAIN`, проксирует фронт и API. Миграции Prisma выполняются при старте backend-контейнера.

Полезные команды:

```bash
npm run prod:logs    # логи всех сервисов
npm run prod:down    # остановка + удаление volumes
```

---

## ⚙️ Переменные окружения

В проекте три файла переменных:

| Файл          | Назначение                           | В git   |
| ------------- | ------------------------------------ | ------- |
| `.env.dev`    | Локальная разработка (значения по умолчанию) | ✔️ да |
| `.env.prod`   | Production-окружение                 | ❌ нет  |
| `.env.example`| Шаблон для справки                   | ✔️ да   |

`.env.dev` закоммичен — он содержит dev-значения по умолчанию (localhost, тестовые секреты) и не представляет угрозы. Для production используйте `.env.prod` — он в `.gitignore`.

### Все переменные (`.env.dev` / `.env.prod`)

| Переменная                     | Описание                                |
| ------------------------------ | --------------------------------------- |
| `DOMAIN`                       | Домен для Caddy                         |
| `API_DOMAIN`                   | Домен для API (Caddy)                   |
| `EMAIL`                        | Эл. почта для Caddy                     |
| `POSTGRES_DB`                  | Название БД PostgreSQL                  |
| `POSTGRES_USER`                | Пользователь PostgreSQL                 |
| `POSTGRES_PASSWORD`            | Пароль PostgreSQL                       |
| `PUBLIC_URL`                   | Публичный URL backend                   |
| `CORS_ORIGIN`                  | Разрешённый origin для CORS             |
| `JWT_SECRET`, `REFRESH_SECRET` | Секреты токенов (≥ 64 символов)         |
| `NEXT_PUBLIC_SITE_URL`         | Публичный URL фронтенда                 |
| `NEXT_PUBLIC_API_URL`          | Публичный URL API (для браузера)        |
| `API_URL`                      | URL API для SSR и Server Actions        |

---

## 📜 Скрипты

### Корень

| Команда              | Действие                                        |
| -------------------- | ----------------------------------------------- |
| `npm run dev`        | Сборка и запуск dev-стека (Postgres + Redis + backend + frontend) |
| `npm run dev:down`   | Остановка dev-стека + удаление volumes          |
| `npm run dev:logs`   | Логи всех сервисов dev-стека                    |
| `npm run dev:seed`   | Наполнение БД тестовыми данными                 |
| `npm run prod`       | Сборка и запуск production-стека (+ Caddy)      |
| `npm run prod:down`  | Остановка production-стека + удаление volumes   |
| `npm run prod:logs`  | Логи всех сервисов production-стека             |

### Backend

| Команда          | Действие                           |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | API в watch-режиме                 |
| `pnpm build`     | Сборка через tsup                  |
| `pnpm db:deploy` | `prisma migrate deploy` + generate |
| `pnpm db:init`   | Заполнение БД тестовыми данными    |
| `pnpm studio`    | Prisma Studio                      |

### Frontend

| Команда       | Действие             |
| ------------- | -------------------- |
| `pnpm dev`    | Dev-сервер Next.js   |
| `pnpm build`  | Production-сборка    |
| `pnpm lint`   | Проверка Biome       |
| `pnpm format` | Форматирование Biome |

---


## Архитектура

```mermaid
flowchart TB
    subgraph Client["Браузер"]
        UI[Next.js App]
    end

    subgraph Proxy["Caddy"]
        RP[Reverse Proxy]
    end

    subgraph App["Приложение"]
        FE[Frontend :3000]
        BE[Backend API :3005]
    end

    subgraph Data["Данные"]
        PG[(PostgreSQL)]
        RD[(Redis)]
    end

    UI --> RP
    RP -->|"/"| FE
    RP -->|"/api/*"| BE
    FE -->|SSR / Server Actions| BE
    UI -->|Client fetch| BE
    BE --> PG
    BE --> RD
```

**Поток запросов в production:** Caddy принимает HTTPS-трафик, отдаёт статику и SSR с Next.js, а запросы к `/api` проксирует на Express. Frontend в рантайме ходит в API по внутреннему URL `http://backend:3005/api`, браузер — по публичному `NEXT_PUBLIC_API_URL`.

---

## 📁 Структура репозитория

```
it-blog/
├── frontend/                 # Next.js (FSD: app, views, widgets, features, entities, shared)
│   └── src/
│       ├── app/              # Роуты App Router, layouts, providers
│       ├── views/            # Страничные композиции
│       ├── widgets/          # Крупные UI-блоки (Header, Footer, формы настроек)
│       ├── features/         # Сценарии (создание статьи, комментарии, auth)
│       ├── entities/         # Доменные сущности (article, user, comment)
│       └── shared/           # UI-kit, API-клиент, утилиты
├── backend/                  # Express API
│   ├── prisma/               # Схема и миграции
│   └── src/
│       ├── modules/          # auth, post, comments, profile, follow, tag, category, upload, seo
│       ├── middlewares/      # errors, rate-limit, post views
│       └── shared/           # prisma, redis, base repository
├── compose.yml               # Базовый compose: postgres, redis, caddy (prod), backend, frontend
├── compose.dev.yml           # Dev-оверрайды: hot-reload, dev-образы
├── .env.dev                  # Переменные для локальной разработки
├── .env.prod                 # Переменные для production
├── .env.example              # Шаблон переменных
├── Caddyfile
└── package.json              # Корневые скрипты Docker Compose
```

---



## 🔎 Что интересно в коде

Если смотрите репозиторий как на code review, обратите внимание на:

- **FSD на фронте** — чёткое разделение `entities` / `features` / `widgets` / `views`, переиспользуемый TipTap-редактор в `shared/ui`.
- **Кеширование Next.js** — `cacheTag`, `revalidateTag`, server actions для инвалидации после публикации и правок постов.
- **Модульный backend** — роуты → контроллеры → сервисы → Prisma; общий `BaseRepository` и транзакции.
- **Просмотры постов** — middleware с Redis и TTL, чтобы не накручивать счётчик при повторных заходах.
- **Схема БД** — snake_case в PostgreSQL, связи постов/тегов, голосования, подписки, типизированные уведомления (модель готова под развитие фичи).
- **Безопасность** — rate limit на мутации, удаление и загрузку файлов; CORS с credentials; валидация env через Zod при старте.

### Основные API-модули

| Префикс                        | Модуль                         |
| ------------------------------ | ------------------------------ |
| `/api/auth`                    | Регистрация, вход, refresh     |
| `/api/posts`                   | CRUD статей, голоса, просмотры |
| `/api/comments`                | Комментарии и ответы           |
| `/api/profile`, `/api/users`   | Профили и пользователи         |
| `/api/follow`                  | Подписки                       |
| `/api/tags`, `/api/categories` | Справочники                    |
| `/api/upload`                  | Загрузка изображений           |
| `/api/seo/sitemap`             | Данные для sitemap             |

---

## 👤 Автор

**Alexander Nelyubov** · [@AlexandrNel](https://github.com/AlexandrNel)

Контакты и ссылки — в [README профиля GitHub](https://github.com/AlexandrNel/AlexandrNel).

---

## 📌 О репозитории

Pet-проект для портфолио и практики fullstack-разработки. Код открыт для просмотра; коммерческое использование без согласования с автором не предполагается.
