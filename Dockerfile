# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the current directory contents to /app
COPY . .

# Expose port 5500
EXPOSE 5500

# Start the application
CMD [ "npm", "start" ]
