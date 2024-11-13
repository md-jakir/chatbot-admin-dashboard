# Stage 1: Build and Test
FROM node:20-alpine AS builder

# Install curl
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy the dependency files and install dependencies in a single layer
COPY package.json yarn.lock ./

# Install dependencies, run linting, unit tests, and build the app in one step to reduce layers
# RUN yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom \
#     && yarn add @testing-library/jest-dom @testing-library/react --dev \
#     && yarn add @babel/preset-react --dev \ 
#     && yarn install --frozen-lockfile

#RUN yarn install --frozen-lockfile
RUN npm i

COPY . .

# Run linting, tests, and build the app in a single layer
# RUN yarn lint \
#     && yarn build

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
