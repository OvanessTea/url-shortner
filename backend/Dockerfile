FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN rm -f package-lock.json && npm install

COPY . .
# Copy .env file if it exists (for build-time variables)
COPY .env* ./

# Build arguments for environment variables
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN rm -f package-lock.json && npm install --only=production

COPY --from=builder /app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3001

# Use environment variables at runtime
CMD ["node", "dist/index.js"] 