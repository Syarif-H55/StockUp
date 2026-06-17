# =====================================================
# StockUp Backend - Dockerfile (Production)
# =====================================================
# Multi-stage build untuk menghasilkan image minimal.
# Stage 1: Install dependencies + build
# Stage 2: Copy build output → production image
# =====================================================

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN npm install --workspace=@stockup/shared --workspace=@stockup/backend

# Copy source code
COPY packages/shared/ ./packages/shared/
COPY apps/backend/ ./apps/backend/

# Build shared package
RUN npm run build --workspace=@stockup/shared

# Generate Prisma client
RUN cd apps/backend && npx prisma generate

# Build backend
RUN npm run build --workspace=@stockup/backend

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package files dan install production dependencies
COPY package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/

RUN npm install --workspace=@stockup/shared --workspace=@stockup/backend --omit=dev

# Copy built artifacts
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/node_modules/.prisma ./apps/backend/node_modules/.prisma

EXPOSE 3001

# Jalankan migrasi lalu start server
CMD ["sh", "-c", "cd apps/backend && npx prisma migrate deploy && node dist/main"]
