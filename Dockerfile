# Stage 1: Build and Test
FROM node:20-alpine AS builder

# Install curl
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy the dependency files and install dependencies in a single layer
COPY package.json yarn.lock ./
RUN npm i
COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the build output and dependencies from the builder stage
COPY --from=builder /app /app

# Expose port 3000
EXPOSE 80

# Start the Next.js app
CMD ["npm", "start"]
