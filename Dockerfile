# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# No corras postinstall aquí
RUN npm ci --ignore-scripts

# --- builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# ahora sí copia TODO el código, incluyendo prisma/
COPY . .

# Genera Prisma (aquí ya existe prisma/schema.prisma)
RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["sh","./start.sh"]