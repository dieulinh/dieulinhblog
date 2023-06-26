# Use a base image with Node.js installed
FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV REACT_APP_DEFAULT_API_URL=https://myclassr00m.herokuapp.com
RUN yarn build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Remove the default Nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]