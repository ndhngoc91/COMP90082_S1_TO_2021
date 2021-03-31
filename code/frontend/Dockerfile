# Set base Node.js image
FROM node:alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install
RUN npm install ip --save-dev 

# Copy source code and project files, and build
COPY . ./
RUN npm run build

# Set base Nginx image
FROM nginx:alpine

# Configure Nginx, and copy the build from previous stage
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container ports 80 and 3000
EXPOSE 80 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]