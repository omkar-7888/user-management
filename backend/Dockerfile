# ===================================================
# Stage 1: Build & Dependency Installation
# ===================================================
# Matching your package.json node requirement (>=22.23.

FROM node:22-alpine AS builder

WORKDIR /app

#Copy package management files and Prisma schema first
COPY package*.json ./
COPY prisma ./prisma/

#Install All dependencies

RUN npm ci

#generate the architecture specific Prisma client
RUN npx prisma generate

COPY . .

#Compile TypeScript files
RUN npm run build
RUN ls -la /app

#Remove development dependencies
RUN npm prune --production

# ===================================================
# Stage 2: Final Production Runtime
# ===================================================

FROM node:22-alpine AS runner
WORKDIR /app

#Security best practices dont run application as root user
USER node

# Copy package configurations node_modules and build artifacts from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

#Copy  you compiled javascript backend code from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Startup Command:
# 1. Runs any pending production migrations safely using 'migrate deploy'
# 2. Starts your compiled ES Module application via 'node dist/server.js'
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
