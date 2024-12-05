# Use official Node.js image as base
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port and start the app
EXPOSE 8080
CMD ["npm", "start"]
