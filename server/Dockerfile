# Use the official Node.js image as the base image
FROM node:22-slim

# Set the environment variable to prevent buffering of Python output
ENV PYTHONUNBUFFERED=1

# Install required dependent packages
RUN apt-get update && apt-get install -y python3 make gcc g++

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -g esbuild
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Expose the GraphQL port
EXPOSE 4000

# Define the command to run
CMD ["npm", "run", "start"]
