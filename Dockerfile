# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port on which the Next.js app will run (default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]