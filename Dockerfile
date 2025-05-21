# Build stage
FROM node:20 as build
WORKDIR /app
COPY docusaurus/package*.json ./
RUN npm ci
COPY docusaurus/ .
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080 