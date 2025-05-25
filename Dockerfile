FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install

COPY . .

ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_SERVICES_BASE_URL=$NEXT_PUBLIC_SERVICES_BASE_URL

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]
