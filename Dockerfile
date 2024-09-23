# Use an official Node runtime as the parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Run tests
RUN npm test

# Command to run the application
CMD ["node", "dist/index.js"]
# CMD ["node", "dist/examples.js"]