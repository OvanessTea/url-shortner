FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Copy .env file if it exists (for build-time variables)
COPY .env* ./

# Build the app with environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

FROM nginx:alpine

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Change ownership of web content only (nginx runs as root by default)
RUN chown -R nginx:nginx /usr/share/nginx/html

# Keep nginx running as root (standard practice for nginx containers)
# This allows nginx to bind to privileged ports and write to /run/nginx.pid

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"] 