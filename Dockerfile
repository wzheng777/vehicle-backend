# Use official Node.js image as base
FROM node

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your application listens on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
