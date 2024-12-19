# Use the official Node.js image as the base image
FROM node:22-alpine AS nextjs

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json env.docker ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code into the container
COPY . .

RUN mv -f env.docker .env.local

# Set the Node.js memory limit to 768 MB
ENV NODE_OPTIONS=--max-old-space-size=768

# Build the application (adjust command if using a different build step)
RUN npm run build

# Expose the port that the app runs on (default 3000 for most Node.js apps)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start:nextjs"]

# Add a second stage for Storybook
FROM node:22-alpine AS storybook

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Expose Storybook port
EXPOSE 6006

# Start Storybook
CMD ["npm", "run", "start:storybook"]
