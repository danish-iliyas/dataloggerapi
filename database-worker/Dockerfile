# Use the official Node.js v22 runtime
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the root package.json and install all dependencies
COPY ../package*.json ./
RUN npm install

# Copy the Worker-specific source code into the container
COPY . .

# Copy the shared code folder into the container
COPY ../shared ./shared

# Define the command to run your worker service
CMD [ "npm", "run", "start:worker" ]