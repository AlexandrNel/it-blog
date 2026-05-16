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

- [О проекте](#о-проекте)
- [Возможности](#возможности)
- [В разработке](#в-разработке)
- [Стек](#стек)
- [Архитектура](#архитектура)
- [Структура репозитория](#структура-репозитория)
- [Быстрый старт](#быстрый-старт)
- [Переменные окружения](#переменные-окружения)
- [Скрипты](#скрипты)
- [Что интересно в коде](#что-интересно-в-коде)
- [Автор](#автор)

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

| Область | Что реализовано |
|--------|------------------|
| **Статьи** | Rich-text редактор (TipTap), превью, черновики и публикация, slug, категории и теги, просмотры |
| **Лента и поиск** | Главная с пагинацией, фильтры, страница поиска, лента по тегу |
| **Комментарии** | Древовидные ответы, голосование за комментарии |
| **Профили** | Публичная страница автора, «О себе», список комментариев, подписки (follow) |
| **Аутентификация** | Регистрация, вход по email или username, JWT + refresh в cookie |
| **Настройки** | Аккаунт, профиль, безопасность, уведомления |
| **SEO** | `metadata`, Open Graph, `sitemap.xml`, `robots.txt`, серверный эндпоинт для карты сайта |
| **Инфраструктура** | Rate limiting, дедупликация просмотров через Redis, загрузка изображений, роли (USER / MODERATOR / ADMIN) |

---

## 🛠️ В разработке

Ниже — план развития проекта. Список отражает текущие приоритеты и направления, над которыми ведётся работа.

### 🎨 Профиль и UX

- **Обложка профиля** — загрузка и редактирование баннера на странице автора.
- **Плавные анимации** — микроинтеракции и переходы между экранами без рывков в интерфейсе.

### 💬 Коммуникация

- **Уведомления в реальном времени** — доставка событий (подписки, ответы, голоса) через WebSocket или SSE; модель в БД уже заложена.
- **Личные сообщения** — чаты между пользователями.

### 🔍 Поиск и навигация

- **Подсветка в поиске** — визуальное выделение совпадений в тексте статей на странице результатов.
- **Якорь на комментарий** — подсветка и прокрутка к нужному комментарию при переходе по прямой ссылке.

### 🛡️ Модерация

- **Админ-панель** — отдельное приложение для модераторов и администраторов: управление контентом, пользователями и ролями.

---

## 🧰 Стек

### Frontend (`/frontend`)

| Технология | Назначение |
|------------|------------|
| **Next.js 16** | App Router, RSC, standalone-сборка |
| **React 19** | UI |
| **TypeScript** | Типизация |
| **Tailwind CSS 4** | Стили |
| **TanStack Query** | Клиентский кеш и мутации |
| **Zustand** | Локальное состояние редактора |
| **TipTap** | WYSIWYG-редактор статей и комментариев |
| **React Hook Form + Zod** | Формы и валидация |
| **Biome** | Линтинг и форматирование |

### Backend (`/backend`)

| Технология | Назначение |
|------------|------------|
| **Node.js + Express** | REST API |
| **TypeScript** | Типизация |
| **Prisma 7** | ORM, миграции |
| **PostgreSQL 15** | Основное хранилище |
| **Redis** | Кеш уникальных просмотров постов |
| **JWT + bcrypt** | Аутентификация |
| **Zod** | Валидация env и DTO |
| **express-rate-limit** | Защита от злоупотреблений |

### 🐳 DevOps

- **Docker** — multi-stage образы для frontend и backend
- **Docker Compose** — dev-инфра и production-стек
- **Caddy** — reverse proxy, TLS, маршрутизация `/api` → backend

---

## 🏗️ Архитектура

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
├── compose.dev.yml           # Postgres + Redis + pgAdmin (локальная разработка)
├── compose.infra.yml         # Caddy + Postgres + Redis (production)
├── compose.app.yml           # Frontend + Backend (production)
├── Caddyfile
└── .env.example
```

---

## 🚀 Быстрый старт

### Требования

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) и Docker Compose

### 1. Инфраструктура (PostgreSQL + Redis)

Из корня репозитория:

```bash
npm run dev:start
```

Поднимутся:

| Сервис | Адрес |
|--------|--------|
| PostgreSQL | `localhost:5432` (user/pass/db: `postgres`) |
| Redis | `localhost:6379` |
| pgAdmin | http://localhost:5050 |

### 2. Backend

```bash
cd backend
cp .env.example .env   # создайте файл вручную, если его ещё нет — см. раздел ниже
pnpm install
pnpm db:deploy         # миграции + generate
pnpm db:init           # сид: админ, категории, теги
pnpm dev
```

API по умолчанию: http://localhost:3005/api

**Пример `backend/.env` для локальной разработки:**

```env
NODE_ENV=development
PORT=3005
PUBLIC_URL=http://localhost:3005
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=<минимум 64 символа — например: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
REFRESH_SECRET=<минимум 64 символа>
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
pnpm install
pnpm dev
```

Приложение: http://localhost:3000

### 4. Тестовый вход после сида

| Поле | Значение |
|------|----------|
| Email | `admin@example.com` |
| Пароль | `admin123!` |

> ⚠️ Используйте только в dev-окружении. Перед production смените пароль и секреты.

---

## 🌐 Production-деплой

1. Скопируйте `.env.example` в `.env` в корне и заполните домен, секреты и пароль БД.
2. Соберите и запустите стек:

```bash
npm run prod:build
npm run prod:start
```

Caddy поднимет HTTPS для `DOMAIN`, проксирует фронт и API. Миграции Prisma выполняются при старте backend-контейнера.

Полезные команды:

```bash
npm run logs    # логи всех сервисов
npm run down    # остановка
npm run clean   # остановка + удаление volumes
```

---

## ⚙️ Переменные окружения

### Корень (`.env.example`)

| Переменная | Описание |
|------------|----------|
| `DOMAIN` | Домен для Caddy |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL фронтенда |
| `NEXT_PUBLIC_API_URL` | Публичный URL API (обычно `{SITE}/api`) |
| `JWT_SECRET`, `REFRESH_SECRET` | Секреты токенов (≥ 64 символов) |
| `POSTGRES_*` | Учётные данные PostgreSQL |

### Frontend (`frontend/.env.example`)

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта для клиента |
| `NEXT_PUBLIC_API_URL` | URL API для браузера |
| `API_URL` | URL API для SSR и Server Actions |

---

## 📜 Скрипты

### Корень

| Команда | Действие |
|---------|----------|
| `npm run dev:start` | Docker: Postgres, Redis, pgAdmin |
| `npm run prod:build` | Сборка production-образов |
| `npm run prod:start` | Запуск полного production-стека |
| `npm run down` | Остановка production |
| `npm run clean` | Остановка + очистка volumes |

### Backend

| Команда | Действие |
|---------|----------|
| `pnpm dev` | API в watch-режиме |
| `pnpm build` | Сборка через tsup |
| `pnpm db:deploy` | `prisma migrate deploy` + generate |
| `pnpm db:init` | Заполнение БД тестовыми данными |
| `pnpm studio` | Prisma Studio |

### Frontend

| Команда | Действие |
|---------|----------|
| `pnpm dev` | Dev-сервер Next.js |
| `pnpm build` | Production-сборка |
| `pnpm lint` | Проверка Biome |
| `pnpm format` | Форматирование Biome |

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

| Префикс | Модуль |
|---------|--------|
| `/api/auth` | Регистрация, вход, refresh |
| `/api/posts` | CRUD статей, голоса, просмотры |
| `/api/comments` | Комментарии и ответы |
| `/api/profile`, `/api/users` | Профили и пользователи |
| `/api/follow` | Подписки |
| `/api/tags`, `/api/categories` | Справочники |
| `/api/upload` | Загрузка изображений |
| `/api/seo/sitemap` | Данные для sitemap |

---

## 👤 Автор

**Alexander Nelyubov** · [@AlexandrNel](https://github.com/AlexandrNel)

Контакты и ссылки — в [README профиля GitHub](https://github.com/AlexandrNel/AlexandrNel).

---

## 📌 О репозитории

Pet-проект для портфолио и практики fullstack-разработки. Код открыт для просмотра; коммерческое использование без согласования с автором не предполагается.
