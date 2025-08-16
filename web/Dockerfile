# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all necessary files for the monorepo
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Copy web app files
COPY web ./web

# Install dependencies
RUN npm ci

# Build the web app
RUN npx nx build web

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist/web /usr/share/nginx/html

# Copy nginx configuration
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]