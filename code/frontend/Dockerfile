# Set base Node.js image
FROM node:lts

# Set working directory
WORKDIR /usr/src/frontend

COPY package*.json ./

RUN yarn install

COPY . ./

RUN yarn start


# # Set base Nginx image
# FROM nginx:alpine

# # Configure Nginx, and copy the build from previous stage
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose container ports 80 and 3000
# EXPOSE 80 3000

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]