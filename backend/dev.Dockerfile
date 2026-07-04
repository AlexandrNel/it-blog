FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY .npmrc ./
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"
RUN pnpm prisma generate

CMD ["pnpm", "dev"]
