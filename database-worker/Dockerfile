# FILE: database-worker/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Define the command to run the worker
# (You may need to adjust this if your start command is different)
CMD [ "npm", "run", "start:worker" ]
