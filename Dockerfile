FROM node:18 AS base
WORKDIR /app

FROM base AS builder
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Remove old build to avoid stale worker versions
RUN rm -rf .next

# Build the project
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
