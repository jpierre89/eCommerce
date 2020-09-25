# Includes Node.js and NPM
FROM node:latest

WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install

# Copy App
COPY . .

# Run entrypoint Script
RUN chmod +x entrypoint.sh
CMD ["bash", "./entrypoint.sh"]