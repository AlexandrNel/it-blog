
FROM node:24-alpine AS base

RUN corepack enable 

WORKDIR /app

FROM base AS fetch

COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ENV CI=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm fetch

FROM fetch AS builder
COPY package.json ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install -w --frozen-lockfile --offline

COPY . .


ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"
RUN pnpm prisma generate
RUN pnpm build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm prune --prod --ignore-scripts

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=${PORT:-1010}

RUN addgroup -S nodejs && adduser -S backend -G nodejs
RUN mkdir -p uploads && chown backend:nodejs uploads

COPY --from=builder --chown=backend:nodejs /app/package.json ./package.json
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/generated ./generated
COPY --from=builder --chown=backend:nodejs /app/prisma ./prisma
COPY --from=builder --chown=backend:nodejs /app/prisma.config.ts ./prisma.config.ts

USER backend

EXPOSE $PORT

CMD ["node", "dist/server.js"]
