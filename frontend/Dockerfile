ARG NODE_VERSION=24.13.0-slim

FROM node:$NODE_VERSION AS base
RUN corepack enable && corepack prepare pnpm@10.30.1 --activate
WORKDIR /app

FROM base AS dependencies

COPY yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* pnpm-workspace.yaml  ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch

COPY package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --offline --frozen-lockfile

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL
ARG API_URL

ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    API_URL=$API_URL

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/app/.next/cache pnpm run build

FROM node:$NODE_VERSION AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    API_URL=$API_URL 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]