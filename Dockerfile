FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for NEXT_PUBLIC_ env vars (needed at build time)
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SHOW_BRANDS
ARG DATABASE_URL
ARG PAYLOAD_SECRET

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SHOW_BRANDS=$NEXT_PUBLIC_SHOW_BRANDS
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

# Patch Payload to allow schema push in production.
# Payload blocks push:true when NODE_ENV=production, but during Docker
# builds the database is unreachable. By removing the guard, push runs
# at runtime on first Payload initialization when the DB is reachable.
RUN sed -i "s/process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false/process.env.PAYLOAD_MIGRATING !== 'true' \&\& this.push !== false/" node_modules/@payloadcms/db-postgres/dist/connect.js

RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Chromium dependencies for PDF generation
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROMIUM_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/polyfill.cjs ./polyfill.cjs
COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/migrations ./migrations

# Payload media collection writes uploads to /app/media (staticDir: 'media').
# The runner stage must ship this directory so (1) committed media is served
# after a rebuild and (2) the dir exists and is owned by the runtime user, so
# new admin uploads can be written. Without this, /api/media/file/* 500s and
# uploads fail with EACCES. A named volume mounted here inherits this
# ownership and is seeded from these files on first mount.
COPY --from=builder --chown=nextjs:nodejs /app/media ./media

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "./entrypoint.sh"]
