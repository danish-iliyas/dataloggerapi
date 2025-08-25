# ---- Base Stage ----
# This stage installs all dependencies, which can be shared by both services.
FROM node:22-slim AS base
WORKDIR /usr/src/app
COPY package*.json ./
# Install only production dependencies to keep the final image small
RUN npm install --omit=dev

# ---- API Build Stage ----
# This stage creates the final, lean image for your API.
FROM node:22-slim AS api
WORKDIR /usr/src/app
# Copy dependencies from the 'base' stage
COPY --from=base /usr/src/app/node_modules ./node_modules
# Copy only the necessary source code for the API
COPY ./package.json ./
COPY ./ingestion-api ./ingestion-api
COPY ./shared ./shared

# GCP's Cloud Run provides the PORT environment variable.
# Your app should listen on the port specified by this variable.
ENV PORT 4000
EXPOSE 4000
CMD [ "npm", "run", "start:api" ]

# ---- Worker Build Stage ----
# This stage creates the final, lean image for your worker.
FROM node:22-slim AS worker
WORKDIR /usr/src/app
# Copy dependencies from the 'base' stage
COPY --from=base /usr/src/app/node_modules ./node_modules
# Copy only the necessary source code for the worker
COPY ./package.json ./
COPY ./database-worker ./database-worker
COPY ./shared ./shared

CMD [ "npm", "run", "start:worker" ]