FROM node:24-alpine AS dependencies

WORKDIR /app

RUN npm install -g pnpm

COPY .npmrc ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"
RUN pnpm prisma generate
RUN pnpm build
RUN pnpm prune --prod

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3005

RUN addgroup -S nodejs && adduser -S backend -G nodejs
RUN mkdir -p uploads && chown backend:nodejs uploads

COPY --from=builder --chown=backend:nodejs /app/package.json ./package.json
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/generated ./generated
COPY --from=builder --chown=backend:nodejs /app/prisma ./prisma
COPY --from=builder --chown=backend:nodejs /app/prisma.config.ts ./prisma.config.ts

USER backend

EXPOSE 3005

CMD ["node", "dist/server.js"]
