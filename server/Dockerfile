# Install base image with Node.js
FROM node:18

# Specify the working directory inside the container
WORKDIR /usr/src/app

# Copy only compiled files
COPY dist ./dist
COPY package*.json ./
COPY .env .env

# Install only production dependencies
RUN npm install --production

# Set the port on which the application will run
ENV PORT=8080

# Open port 8080 for the application
EXPOSE 8080

# Command to start the application
CMD ["node", "dist/main.js"]
