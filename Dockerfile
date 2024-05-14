# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.18.2
# syntax = docker/dockerfile:1
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV VERSION_PRO=true

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
#RUN apt-get update -qq && \
#    apt-get install -y python-is-python3 pkg-config build-essential
COPY package*.json ./
# Install node modules
COPY --link package.json package-lock.json ./
RUN npm install --production=false



# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

RUN cp .env build/.env

#RUN npm run build
RUN rm -rf ./node_modules
RUN npm install -g serve

ENV PORT=8080

EXPOSE 8080
CMD ["serve", "-s", "build", "-p", "8080"]
# Start the server by default, this can be overwritten at runtime
#CMD [ "npm", "run", "start" ]
