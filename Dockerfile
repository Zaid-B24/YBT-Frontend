# --- Stage 1: Build the React App ---
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# CRITICAL: We accept the API URL as a build argument.
# This allows us to change the backend URL in docker-compose without editing code.
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the app (CI=false is already in your package.json, which is great)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the built files from Stage 1 to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy our custom Nginx config (created below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]