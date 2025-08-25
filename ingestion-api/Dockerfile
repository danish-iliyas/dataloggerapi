# Use the official Node.js v22 runtime
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the root package.json and install all dependencies.
# This leverages Docker's layer caching for faster builds.
COPY ../package*.json ./
RUN npm install

# Copy the API-specific source code into the container
COPY . .

# Copy the shared code folder into the container
COPY ../shared ./shared

# Your app binds to port 8080, which Cloud Run will automatically
# map to the public-facing port 443 for HTTPS.
ENV PORT 8080
EXPOSE 8080

# Define the command to run your API service
CMD [ "npm", "run", "start:api" ]