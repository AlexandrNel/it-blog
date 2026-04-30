FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY .npmrc ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 

COPY . .

ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"
RUN pnpm prisma generate
RUN pnpm build

EXPOSE 8889

CMD ["node", "dist/server.js"]
