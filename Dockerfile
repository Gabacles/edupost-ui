# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Instala compatibilidade com glibc
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Etapa de dependências
FROM base AS deps

COPY package.json package-lock.json* .npmrc* ./

RUN npm ci

# Etapa de build
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Passa variáveis de ambiente do GitHub Actions para o build
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_SERVICES_BASE_URL
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_SERVICES_BASE_URL=$NEXT_PUBLIC_SERVICES_BASE_URL

RUN npm run build

# Etapa de produção
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Cria usuário não-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copia arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
